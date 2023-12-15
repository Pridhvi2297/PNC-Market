const { Schema, model } = require('mongoose');

// Define the schema for storing Stripe information
const stripeSchema = new Schema({
    // Seller ID, a MongoDB ObjectId and required
    sellerId: {
        type: Schema.ObjectId,
        required: true
    },
    // Stripe ID, a string and required
    stripeId: {
        type: String,
        required: true
    },
    // Code associated with the Stripe account, a string and required
    code: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Create and export the model for Stripe information
module.exports = model('stripes', stripeSchema);
