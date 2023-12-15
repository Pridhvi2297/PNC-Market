const { Schema, model } = require('mongoose');

// Define Wishlist Schema
const wishlistSchema = new Schema(
  {
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    image: { type: String, required: true },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Export Wishlist Model
module.exports = model('wishlists', wishlistSchema);
