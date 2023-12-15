const { Schema, model } = require('mongoose');

// Define the schema for My Shop Wallet
const myShopWalletSchema = new Schema({
    // Amount in the wallet, a number and required
    amount: {
        type: Number,
        required: true
    },
    // Month associated with the wallet, a number and required
    month: {
        type: Number,
        required: true
    },
    // Year associated with the wallet, a number and required
    year: {
        type: Number,
        required: true
    }
}, { timestamps: true });

// Create and export the model for My Shop Wallets
module.exports = model('myShopWallets', myShopWalletSchema);
