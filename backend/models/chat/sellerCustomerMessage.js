const { Schema, model } = require('mongoose');

// Define the schema for seller-customer messages
const sellerCustomerSchema = new Schema({
    // Sender's name is required
    senderName: {
        type: String,
        required: true
    },
    // Sender's ID is required
    senderId: {
        type: String,
        required: true
    },
    // Receiver's ID is required
    receiverId: {
        type: String,
        required: true
    },
    // The message content is required
    message: {
        type: String,
        required: true
    },
    // Message status with a default value of 'unseen'
    status: {
        type: String,
        default: 'unseen'
    }
}, { timestamps: true }); // Enable timestamps for created and updated dates

// Create and export the model for seller-customer messages
module.exports = model('seller_customer_messages', sellerCustomerSchema);
