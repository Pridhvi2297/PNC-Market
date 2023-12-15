const { Schema, model } = require('mongoose');

// Define the schema for author orders
const authorSchema = new Schema({
    // Order ID, represented as a Schema ObjectId and is required
    orderId: {
        type: Schema.ObjectId,
        required: true
    },
    // Seller ID, represented as a Schema ObjectId and is required
    sellerId: {
        type: Schema.ObjectId,
        required: true
    },
    // Array of products in the order, required
    products: {
        type: Array,
        required: true
    },
    // Price of the order, a number and required
    price: {
        type: Number,
        required: true
    },
    // Payment status of the order, a string and required
    payment_status: {
        type: String,
        required: true
    },
    // Shipping information, a string and required
    shippingInfo: {
        type: String,
        required: true
    },
    // Delivery status of the order, a string and required
    delivery_status: {
        type: String,
        required: true
    },
    // Date of the order, a string and required
    date: {
        type: String,
        required: true
    },
}, { timestamps: true });

// Create and export the model for author orders
module.exports = model('authorOrders', authorSchema);
