const { Schema, model } = require('mongoose');

// Define the schema for admin
const adminSchema = new Schema({
    // Admin's name, which is required
    name: {
        type: String,
        required: true
    },
    // Admin's email, which is required
    email: {
        type: String,
        required: true
    },
    // Admin's password, which is required but excluded from query results
    password: {
        type: String,
        required: true,
        select: false
    },
    // Admin's image URL, which is required
    image: {
        type: String,
        required: true
    },
    // Admin's role, with a default value of 'admin'
    role: {
        type: String,
        default: 'admin'
    }
});

// Create and export the model for admins
module.exports = model('admins', adminSchema);
