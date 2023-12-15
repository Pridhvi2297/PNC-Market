const { Schema, model } = require('mongoose');

// Define the schema for customer orders
const customerOrderSchema = new Schema({
    // Customer ID associated with the order, a Schema ObjectId and required
    customerId: {
        type: Schema.ObjectId,
        required: true
    },
    // Array of products in the order, required
    products: {
        type: Array,
        required: true
    },
    // Total price of the order, a number and required
    price: {
        type: Number,
        required: true
    },
    // Payment status of the order, a string and required
    payment_status: {
        type: String,
        required: true
    },
    // Shipping information for the order, an object and required
    shippingInfo: {
        type: Object,
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

// Create and export the model for customer orders
module.exports = model('customerOrders', customerOrderSchema);
