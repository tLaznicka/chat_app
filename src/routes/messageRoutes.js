const express = require('express'); // Import Express.js
const Message = require('../models/message'); // Import Message model
const Room = require('../models/room'); // Import Room model
const authenticate = require('../middleware/authenticate'); // Import authentication middleware

const router = express.Router(); // Create a new router

// Route to get all messages in a specific room
router.get('/room/:roomId', authenticate, async (req, res) => {
    try {
        // Find all messages in the room and populate the user field
        /**
         * Retrieves messages from the database based on the specified room ID.
         * @param {string} req.params.roomId - The ID of the room to retrieve messages from.
         * @returns {Promise<Array>} - A promise that resolves to an array of messages.
         */
        const messages = await Message.find({ room: req.params.roomId }).populate('user');
        res.send(messages); // Send the messages as the response
    } catch (error) {
        res.status(500).send(error); // Send a 500 Internal Server Error response if an error occurs
    }
});

// Route to get all messages from a specific user
router.get('/user/:userId', authenticate, async (req, res) => {
    try {
        // Find all messages from the user
        const messages = await Message.find({ user: req.params.userId });
        res.send(messages); // Send the messages as the response
    } catch (error) {
        res.status(500).send(error); // Send a 500 Internal Server Error response if an error occurs
    }
});

// Route to get all messages containing a specific word (case insensitive)
router.get('/search', authenticate, async (req, res) => {
    const searchWord = req.query.term; // Get the search term from the query parameters
    const regex = new RegExp(searchWord, 'i'); // Create a case insensitive regex from the search term
    try {
        // Find all messages that contain the search term
        const messages = await Message.find({ content: { $regex: regex } });
        res.send(messages); // Send the messages as the response
    } catch (error) {
        // Send a 500 Internal Server Error response if an error occurs
    }
});