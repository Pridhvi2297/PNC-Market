const { Schema, model } = require('mongoose');

// Define the schema for card products
const cardSchema = new Schema({
    // User ID associated with the card, represented as a Schema ObjectId and is required
    userId: {
        type: Schema.ObjectId,
        required: true
    },
    // Product ID associated with the card, represented as a Schema ObjectId and is required
    productId: {
        type: Schema.ObjectId,
        required: true
    },
    // Quantity of the product in the card, a number and required
    quantity: {
        type: Number,
        required: true
    },
}, { timestamps: true });

// Create and export the model for card products
module.exports = model('cardProducts', cardSchema);
