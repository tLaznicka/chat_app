const jwt = require('jsonwebtoken'); // Import JSON Web Token for authentication
const User = require('../models/user'); // Import User model

// Middleware function for authentication
/**
 * Middleware function to authenticate user requests.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
const authenticate = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const token = req.header('Authorization').replace('Bearer ', '');
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Find the user associated with the token
        const user = await User.findOne({ _id: decoded.id, 'tokens.token': token });

        // If no user is found, throw an error
        if (!user) {
            throw new Error();
        }

        // Attach the token and user to the request object
        req.token = token;
        req.user = user;
        // Proceed to the next middleware function or route handler
        next();
    } catch (error) {
        // If an error is caught, send a 401 Unauthorized response
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

// Export the authenticate middleware function
module.exports = authenticate;