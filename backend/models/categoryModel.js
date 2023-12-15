const { Schema, model } = require('mongoose');

// Define the schema for categories
const categorySchema = new Schema({
    // Name of the category, a string and required
    name: {
        type: String,
        required: true
    },
    // Image associated with the category, a string and required
    image: {
        type: String,
        required: true
    },
    // Slug for the category, a string and required
    slug: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Create a text index on the name field for text-based searches
categorySchema.index({
    name: 'text'
});

// Create and export the model for categories
module.exports = model('categorys', categorySchema);
