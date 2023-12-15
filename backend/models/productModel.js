const { Schema, model } = require('mongoose');

// Define the schema for products
const productSchema = new Schema({
    // The ID of the seller associated with the product, a MongoDB ObjectId and required
    sellerId: {
        type: Schema.ObjectId,
        required: true
    },
    // Name of the product, a string and required
    name: {
        type: String,
        required: true
    },
    // Slug for the product, a string and required
    slug: {
        type: String,
        required: true
    },
    // Category of the product, a string and required
    category: {
        type: String,
        required: true
    },
    // Brand of the product, a string and required
    brand: {
        type: String,
        required: true
    },
    // Price of the product, a number and required
    price: {
        type: Number,
        required: true
    },
    // Stock quantity of the product, a number and required
    stock: {
        type: Number,
        required: true
    },
    // Discount percentage for the product, a number and required
    discount: {
        type: Number,
        required: true
    },
    // Description of the product, a string and required
    description: {
        type: String,
        required: true
    },
    // Name of the shop associated with the product, a string and required
    shopName: {
        type: String,
        required: true
    },
    // Array of images associated with the product, an array and required
    images: {
        type: Array,
        required: true
    },
    // Rating of the product, a number with a default value of 0
    rating: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

// Indexing for full-text search on name, category, brand, and description with weights
productSchema.index({
    name: 'text',
    category: 'text',
    brand: 'text',
    description: 'text'
}, {
    // Weights for each field in the full-text search
    weights: {
        name: 5,
        category: 4,
        brand: 3,
        description: 2
    }
});

// Create and export the model for products
module.exports = model('products', productSchema);
