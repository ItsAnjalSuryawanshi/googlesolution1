const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const IDX = require("@ceramicnetwork/idx");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// User Schema & Model
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    did: { type: String } // Decentralized Identifier from IDX
});

const User = mongoose.model("User", UserSchema);

// IDX Setup
const idx = new IDX({ ceramic: "https://ceramic-clay.3boxlabs.com" });

// Register User
app.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create DID (Decentralized Identity)
        const did = await idx.create({ username, email });

        const newUser = new User({ username, email, password: hashedPassword, did: did.id });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully", did: did.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login User
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, did: user.did }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ message: "Login successful", token, did: user.did });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
