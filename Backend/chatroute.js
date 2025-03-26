const express = require('express');
const { MongoClient } = require('mongodb');
const { Server } = require("socket.io");
const http = require('http').Server(app);
const io = new Server(http, {
    cors: {
        origin: "*", // Allow all origins (INSECURE for production)
        methods: ["GET", "POST"]
    }
});

const app = express();
app.use(express.json());

// --- MongoDB Connection ---
const mongoURI = 'your-mongodb-connection-string'; // Replace with your MongoDB URI
const dbName = 'athleteManagement'; // Your database name
const client = new MongoClient(mongoURI);

let db;

async function connectToMongoDB() {
    try {
        await client.connect();
        db = client.db(dbName);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); // Exit if connection fails
    }
}

connectToMongoDB();

// --- WebSocket Logic ---

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });

    // Handle incoming messages
    socket.on('send_message', async (data) => {
        try {
            const { senderId, text, recipientId, groupId } = data;

            // Validate message data (Essential!)
            if (!senderId || !text) {
                console.error("Error: senderId and text are required");
                socket.emit('error', { message: "Sender and text are required" });
                return;
            }

            const newMessage = {
                senderId: senderId,
                text: text,
                recipientId: recipientId,
                groupId: groupId,
                timestamp: new Date(),
            };

            // Store the message in MongoDB
            const result = await db.collection('messages').insertOne(newMessage);
            const messageId = result.insertedId;

            // Broadcast the message (Adjust for your chat logic)
            io.emit('receive_message', {
                id: messageId,
                senderId: senderId,
                text: text,
                timestamp: newMessage.timestamp,
            });

        } catch (error) {
            console.error("Error processing message:", error);
            socket.emit('error', { message: "Error processing message" });
        }
    });
});

// --- API Endpoints ---

// Get messages for a user (or chat) - Refined Query
app.get('/api/messages/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // More flexible query to handle one-to-one and group chats
        const query = {
            $or: [
                { senderId: userId },
                { recipientId: userId },
                { groupId: userId }  // Assuming groupId might be a user ID in some cases
            ]
        };

        const messages = await db.collection('messages').find(query).sort({ timestamp: 1 }).toArray();

        res.json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Error fetching messages" });
    }
});

// --- Server Startup ---
const PORT = process.env.PORT || 3000; // Use environment port or 3000
http.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
