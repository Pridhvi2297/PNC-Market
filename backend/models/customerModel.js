const { Schema, model } = require('mongoose');

// Define the schema for customers
const customerSchema = new Schema({
    // Name of the customer, a string and required
    name: {
        type: String,
        required: true
    },
    // Email of the customer, a string and required
    email: {
        type: String,
        required: true
    },
    // Password of the customer, a string and required but not selected by default
    password: {
        type: String,
        required: true,
        select: false
    },
    // Method used for customer creation, a string and required
    method: {
        type: String,
        required: true,
    }
}, { timestamps: true });

// Create and export the model for customers
module.exports = model('customers', customerSchema);
