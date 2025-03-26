import React, { useState, useEffect, useRef } from 'react';
import './Chat.css'; // Create a Chat.css for styling

function Chat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const chatContainerRef = useRef(null); // For scrolling to bottom

    // --- Placeholder for fetching initial messages ---
    useEffect(() => {
        // In a real application, you would fetch initial messages from the backend here
        // Example:
        // async function fetchMessages() {
        //     try {
        //         const response = await fetch('/api/chat/123'); // Replace 123 with chat ID
        //         if (response.ok) {
        //             const data = await response.json();
        //             setMessages(data);
        //         } else {
        //             console.error('Failed to fetch messages');
        //         }
        //     } catch (error) {
        //         console.error('Error:', error);
        //     }
        // }
        // fetchMessages();

        // --- Placeholder for WebSocket connection setup ---
        // In a real application, you would set up a WebSocket connection here
        // Example (using Socket.IO):
        // const socket = io('http://your-backend-url'); // Replace with your backend URL
        // socket.on('message', (message) => {
        //     setMessages(prevMessages => [...prevMessages, message]);
        // });

        // --- Simulated initial messages for demonstration ---
        setMessages([
            { id: 1, sender: 'Coach', text: 'Welcome to the team chat!' },
            { id: 2, sender: 'You', text: 'Thanks!' },
        ]);

        // Scroll to the bottom on message updates
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, []); // Empty dependency array for initial load

    // Scroll to the bottom on message updates
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const messageToSend = {
            sender: 'You', // Or get the current user's name
            text: newMessage,
        };

        // --- Placeholder for sending message to backend ---
        // In a real application, you would send the message to the backend via WebSocket or API call
        // Example (using Socket.IO):
        // socket.emit('message', messageToSend);

        // --- Simulated message sending ---
        setMessages(prevMessages => [...prevMessages, {
            id: Date.now(), // Replace with a proper ID from the backend
            ...messageToSend
        }]);
        setNewMessage('');
    };

    return (
        <div className="chat-container">
            <div className="chat-messages" ref={chatContainerRef}>
                {messages.map(message => (
                    <div key={message.id} className={`message ${message.sender === 'You' ? 'sent' : 'received'}`}>
                        <div className="message-sender">{message.sender}</div>
                        <div className="message-text">{message.text}</div>
                    </div>
                ))}
            </div>
            <form className="chat-input-form" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    className="chat-input"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit" className="chat-send-button">Send</button>
            </form>
        </div>
    );
}

export default Chat;
