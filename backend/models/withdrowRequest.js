const { Schema, model } = require('mongoose');

// Define Withdraw Schema
const withdrowSchema = new Schema(
  {
    sellerId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: 'pending' },
  },
  { timestamps: true }
);

// Export Withdraw Model
module.exports = model('withdrowRequest', withdrowSchema);
