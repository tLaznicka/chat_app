// Importing the mongoose library
const mongoose = require('mongoose');

// Defining the message schema
/**
 * Represents the schema for a message.
 * @typedef {Object} MessageSchema
 * @property {string} content - The content of the message.
 * @property {mongoose.Schema.Types.ObjectId} user - The user who sent the message.
 * @property {Date} createdAt - The timestamp when the message was created.
 * @property {Date} updatedAt - The timestamp when the message was last updated.
 */
const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

// Exporting the message model
module.exports = mongoose.model('Message', messageSchema);