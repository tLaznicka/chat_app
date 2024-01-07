// Import required modules
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define user schema
/**
 * Represents the user schema.
 * @typedef {Object} UserSchema
 * @property {string} username - The username of the user.
 * @property {string} password - The password of the user.
 */
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

// Compare password with hashed password
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Export user model
module.exports = mongoose.model('User', userSchema);
