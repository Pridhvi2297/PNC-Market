const { Schema, model } = require('mongoose');

// Define the schema for product reviews
const reviewSchema = new Schema({
    // The ID of the product associated with the review, a MongoDB ObjectId and required
    productId: {
        type: Schema.ObjectId,
        required: true
    },
    // Name of the reviewer, a string and required
    name: {
        type: String,
        required: true
    },
    // Rating given in the review, a number with a default value of 0
    rating: {
        type: Number,
        default: 0
    },
    // Text content of the review, a string and required
    review: {
        type: String,
        required: true
    },
    // Date when the review was created, a string and required
    date: {
        type: String,
        required: true
    },
}, { timestamps: true });

// Create and export the model for product reviews
module.exports = model('reviews', reviewSchema);
