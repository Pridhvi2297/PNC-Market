const cardModel = require("../../models/cardModel");
const wishlistModel = require("../../models/wishlistModel");
const { responseReturn } = require("../../utils/response");
const { mongo: { ObjectId } } = require("mongoose");

class CardController {
  // Function to add a product to the shopping cart
  addToCard = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    
    try {
      const product = await cardModel.findOne({ userId, productId });

      if (product) {
        responseReturn(res, 404, { error: "Product already added to cart" });
      } else {
        const newProduct = await cardModel.create({ userId, productId, quantity });
        responseReturn(res, 201, { message: "Add to cart success", product: newProduct });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Function to get products in the shopping cart with additional calculations
  getCardProducts = async (req, res) => {
    const co = 5; // Constant for discount calculation
    const { userId } = req.params;

    try {
      const cardProducts = await cardModel.aggregate([
        { $match: { userId: new ObjectId(userId) } },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "products",
          },
        },
      ]);

      let buyProductItem = 0;
      let calculatePrice = 0;
      let cardProductCount = 0;

      const outOfStockProduct = cardProducts.filter((p) => p.products[0].stock < p.quantity);
      outOfStockProduct.forEach((p) => (cardProductCount += p.quantity));

      const stockProduct = cardProducts.filter((p) => p.products[0].stock >= p.quantity);
      stockProduct.forEach((p) => {
        const { quantity } = p;
        cardProductCount += quantity;
        buyProductItem += quantity;

        const { price, discount } = p.products[0];
        calculatePrice += discount !== 0 ? quantity * (price - Math.floor((price * discount) / 100)) : quantity * price;
      });

      const uniqueSellers = [...new Set(stockProduct.map((p) => p.products[0].sellerId.toString()))];
      const cardProductsBySeller = uniqueSellers.map((sellerId) => {
        let price = 0;
        let products = [];

        stockProduct.forEach((p) => {
          const tempProduct = p.products[0];

          if (sellerId === tempProduct.sellerId.toString()) {
            let pri = tempProduct.discount !== 0
              ? tempProduct.price - Math.floor((tempProduct.price * tempProduct.discount) / 100)
              : tempProduct.price;

            pri -= Math.floor((pri * co) / 100);
            price += pri * p.quantity;

            products = [
              ...products,
              {
                _id: p._id,
                quantity: p.quantity,
                productInfo: tempProduct,
              },
            ];
          }
        });

        return {
          sellerId,
          shopName: products.length > 0 ? products[0].productInfo.shopName : '',
          price,
          products,
        };
      });

      responseReturn(res, 200, {
        cardProducts: cardProductsBySeller,
        price: calculatePrice,
        cardProductCount,
        shippingFee: 10 * cardProductsBySeller.length,
        outOfStockProduct,
        buyProductItem,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // Function to delete a product from the shopping cart
  deleteCardProduct = async (req, res) => {
    const { card_id } = req.params;

    try {
      await cardModel.findByIdAndDelete(card_id);
      responseReturn(res, 200, { message: "Success" });
    } catch (error) {
      console.log(error.message);
    }
  };

  // Function to increase the quantity of a product in the shopping cart
  quantityInc = async (req, res) => {
    const { card_id } = req.params;

    try {
      const product = await cardModel.findById(card_id);
      const { quantity } = product;
      await cardModel.findByIdAndUpdate(card_id, { quantity: quantity + 1 });
      responseReturn(res, 200, { message: "Success" });
    } catch (error) {
      console.log(error.message);
    }
  };

  // Function to decrease the quantity of a product in the shopping cart
  quantityDec = async (req, res) => {
    const { card_id } = req.params;

    try {
      const product = await cardModel.findById(card_id);
      const { quantity } = product;
      await cardModel.findByIdAndUpdate(card_id, { quantity: quantity - 1 });
      responseReturn(res, 200, { message: "Success" });
    } catch (error) {
      console.log(error.message);
    }
  };

  // Function to add a product to the wishlist
  addWishlist = async (req, res) => {
    const { slug } = req.body;

    try {
      const product = await wishlistModel.findOne({ slug });

      if (product) {
        responseReturn(res, 404, { error: "Already added to wishlist" });
      } else {
        await wishlistModel.create(req.body);
        responseReturn(res, 201, { message: "Add to wishlist success" });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Function to get wishlist items for a user
  getWishlist = async (req, res) => {
    const { userId } = req.params;

    try {
      const wishlists = await wishlistModel.find({ userId });
      responseReturn(res, 200, { wishlistCount: wishlists.length, wishlists });
    } catch (error) {
      console.log(error.message);
    }
  };

  // Function to delete a product from the wishlist
  deleteWishlist = async (req, res) => {
    const { wishlistId } = req.params;

    try {
      const wishlist = await wishlistModel.findByIdAndDelete(wishlistId);
      responseReturn(res, 200, { message: "Remove success", wishlistId });
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = new CardController();
