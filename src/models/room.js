const mongoose = require('mongoose'); // Import Mongoose for MongoDB interactions

// Define a new schema for Room
/**
 * Represents the schema for a chat room.
 *
 * @typedef {Object} RoomSchema
 * @property {string} name - The name of the room.
 * @property {boolean} isPrivate - Indicates if the room is private.
 * @property {Array<string>} members - An array of member IDs in the room.
 * @property {Date} createdAt - The timestamp when the room was created.
 * @property {Date} updatedAt - The timestamp when the room was last updated.
 */
const roomSchema = new mongoose.Schema({
    name: { // Room name
        type: String, // Name should be a string
        required: true, // Name is required
        unique: true // Name should be unique
    },
    members: [{ // Array of members in the room
        type: mongoose.Schema.Types.ObjectId, // Members are referenced by their ObjectId
        ref: 'User' // Reference to User model
    }],
    isPrivate: { // Flag to indicate if the room is private
        type: Boolean, // isPrivate should be a boolean
        default: false // Default value is false
    }
}, { timestamps: true }); // Enable timestamps for created and updated at

// Create a Room model from the schema
const Room = mongoose.model('Room', roomSchema);

// Export the Room model
module.exports = Room;