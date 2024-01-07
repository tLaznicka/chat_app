require('dotenv').config(); // Load environment variables from .env file
const express = require('express'); // Import Express.js
const http = require('http'); // Import Node.js HTTP module
const socketio = require('socket.io'); // Import Socket.IO
const mongoose = require('mongoose'); // Import Mongoose for MongoDB interactions

// Import routes
const userRoutes = require('./routes/userRoutes'); // User-related routes
const messageRoutes = require('./routes/messageRoutes'); // Message-related routes

// Import models
const Room = require('./models/room'); // Room model
const Message = require('./models/message'); // Message model

// Import middleware
/**
 * Middleware function for authentication.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
const authenticate = require('./middleware/authenticate'); // Authentication middleware

// Import JSON Web Token
const jwt = require('jsonwebtoken'); // JWT for authentication

// Initialize express app
const app = express();

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketio(server);

// Use express.json middleware to parse JSON requests
app.use(express.json());

// Use user routes
app.use(userRoutes);

// Use message routes with authentication middleware
app.use('/messages', authenticate, messageRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// Authenticate WebSocket connections
io.use((socket, next) => {
  // Check if token is provided in handshake query
  if (socket.handshake.query && socket.handshake.query.token){
    // Verify the token
    jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET, (err, decoded) => {
      // If verification fails, return an error
      if (err) return next(new Error('Authentication error'));
      // If verification is successful, attach decoded token to the socket
      socket.decoded = decoded;
      next();
    });
  }
});