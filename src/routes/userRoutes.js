const express = require('express'); // Import Express.js
const bcrypt = require('bcryptjs'); // Import bcrypt.js for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for generating JWTs
const User = require('../models/user'); // Import User model
const router = express.Router(); // Create a new router

// Route to register a new user
router.post('/register', async (req, res) => {
    try {
        // Extract username and password from the request body
        const { username, password } = req.body;
        // Check if a user with the given username already exists
        if (await User.findOne({ username })) {
            // If the user exists, send a 409 Conflict response
            return res.status(409).send({ error: 'Username already exists' });
        }
        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 8);
        // Create a new user with the hashed password
        const user = new User({ username, password: hashedPassword });
        // Save the user to the database
        await user.save();
        // Create a JWT for the user, with a 2 hour expiry
        /**
         * JSON Web Token representing the user's authentication token.
         * @typedef {string} Token
         */
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
        // Send a 201 Created response with the user and token
        res.status(201).send({ user, token });
    } catch (error) {
        // Send a 500 Internal Server Error response if an error occurs
        res.status(500).send(error);
    }
});

// Route to login a user
router.post('/login', async (req, res) => {
    try {
        // Extract username and password from the request body
        const { username, password } = req.body;
        // Find the user with the given username
        const user = await User.findOne({ username });

        // Check if the password is correct
        const isMatch = user && await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // If the password is incorrect, send a 401 Unauthorized response
            return res.status(401).send({ error: 'Invalid login credentials' });
        }

        // Create a JWT for the user, with a 2 hour expiry
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });

        // Send the user and token as the response
        res.send({ user, token });
    } catch (error) {
        // Send a 500 Internal Server Error response if an error occurs
        res.status(500).send(error);
    }
});

// Export the router
module.exports = router;