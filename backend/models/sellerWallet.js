const { Schema, model } = require('mongoose');

// Define the schema for sellers
const sellerSchema = new Schema({
    // Name of the seller, a string and required
    name: {
        type: String,
        required: true
    },
    // Email of the seller, a string and required
    email: {
        type: String,
        required: true
    },
    // Password of the seller, a string and required but not selected by default
    password: {
        type: String,
        required: true,
        select: false
    },
    // Role of the seller, a string with a default value of 'seller'
    role: {
        type: String,
        default: 'seller'
    },
    // Status of the seller, a string with a default value of 'pending'
    status: {
        type: String,
        default: 'pending'
    },
    // Payment status of the seller, a string with a default value of 'inactive'
    payment: {
        type: String,
        default: 'inactive'
    },
    // Method used by the seller, a string and required
    method: {
        type: String,
        required: true,
    },
    // Image URL for the seller, a string with a default value of ''
    image: {
        type: String,
        default: ''
    },
    // Information about the seller's shop, an object with a default value of an empty object
    shopInfo: {
        type: Object,
        default: {}
    },
}, { timestamps: true });

// Indexing for text search on name and email with specified weights
sellerSchema.index({
    name: 'text',
    email: 'text'
}, {
    weights: {
        name: 5,
        email: 4,
    }
});

// Create and export the model for sellers
module.exports = model('sellers', sellerSchema);
