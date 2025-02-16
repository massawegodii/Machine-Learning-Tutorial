const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

// Knowledge base for common medical queries
const knowledgeBase = {
    "chronic kidney disease": "Chronic kidney disease (CKD) is a condition characterized by a gradual loss of kidney function over time.",
    "symptoms of chronic kidney disease": "Symptoms include swelling in the legs, fatigue, nausea, shortness of breath, and changes in urination patterns.",
    "sign of kidney disease": "Signs of kidney disease can include swelling, back pain, changes in urination, and persistent itching."
};

// Memory storage for conversations
let chatMemory = [];

// Greeting responses
const greetings = ["hello", "hi", "hey", "hola", "good morning", "good evening"];
const botGreetings = ["Hello! How can I assist you today? 😊", "Hi there! Need any help?", "Hey! Ask me anything."];

// Abusive words detection
const abusiveWords = ["stupid", "idiot", "fool", "dumb", "shut up"];
let userWarnings = {};

// Function to process chatbot responses
function chatbotResponse(userInput, userId) {
    const inputLower = userInput.toLowerCase();

    // 1️⃣ Check for greetings
    if (greetings.includes(inputLower)) {
        return botGreetings[Math.floor(Math.random() * botGreetings.length)];
    }

    // 2️⃣ Check for abusive language
    for (let word of abusiveWords) {
        if (inputLower.includes(word)) {
            userWarnings[userId] = (userWarnings[userId] || 0) + 1;
            if (userWarnings[userId] >= 3) {
                return "🚫 You have been blocked for repeated offensive language.";
            }
            return `⚠️ Warning ${userWarnings[userId]}/3 - Please avoid using offensive language.`;
        }
    }

    // 3️⃣ Check in the knowledge base
    for (let key in knowledgeBase) {
        if (inputLower.includes(key)) {
            return knowledgeBase[key];
        }
    }

    // 4️⃣ Check chat history (simple memory-based responses)
    for (let prevMessage of chatMemory) {
        if (prevMessage.includes(inputLower)) {
            return "We discussed this earlier! Here's what I mentioned: " + prevMessage;
        }
    }

    // 5️⃣ Fun responses for modern engagement
    const funResponses = [
        "That's an interesting question! Tell me more! 😊",
        "Hmm, I'm not sure, but I can learn! 🧠",
        "I love chatting! What else would you like to know?",
        "Cool! I can help you find more information on that!"
    ];
    return funResponses[Math.floor(Math.random() * funResponses.length)];
}

// Chatbot API endpoint
app.post('/chat', (req, res) => {
    try {
        const userId = req.body.userId || "guest"; // Unique user ID for tracking
        const userInput = req.body.message;
        if (!userInput) return res.status(400).json({ error: 'Message is required' });

        // Get chatbot response
        const response = chatbotResponse(userInput, userId);

        // Store conversation history
        chatMemory.push(userInput);

        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`🚀 Chatbot API running at http://localhost:${port}`);
});
