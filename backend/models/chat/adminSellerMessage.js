const { Schema, model } = require('mongoose');

// Define the schema for admin-seller messages
const adminSellerMessageSchema = new Schema({
    // Sender's name is required
    senderName: {
        type: String,
        required: true
    },
    // Sender's ID with a default value of an empty string
    senderId: {
        type: String,
        default: ''
    },
    // Receiver's ID with a default value of an empty string
    receiverId: {
        type: String,
        default: ''
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

// Create and export the model for admin-seller messages
module.exports = model('seller_admin_messages', adminSellerMessageSchema);
