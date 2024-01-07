// Import the mongoose library
/**
 * Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
 * It provides a straight-forward, schema-based solution to model your application data.
 * @type {import('mongoose')}
 */
const mongoose = require('mongoose');

// Connect to the MongoDB database using the provided URL
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
