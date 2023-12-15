const { Schema, model } = require('mongoose');

// Define the schema for seller customers
const sellerCustomerSchema = new Schema({
    // Seller's ID, which is required
    myId: {
        type: String,
        required: true
    },
    // An array to store seller's friends, with a default value of an empty array
    myFriends: {
        type: Array,
        default: []
    }
}, { timestamps: true }); // Enable timestamps for created and updated dates

// Create and export the model for seller customers
module.exports = model('seller_customers', sellerCustomerSchema);
