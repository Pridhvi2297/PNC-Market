const categoryModel = require('../../models/categoryModel');
const productModel = require('../../models/productModel');
const queryProducts = require('../../utils/queryProducts');
const reviewModel = require('../../models/reviewModel');
const moment = require('moment');
const { mongo: { ObjectId } } = require('mongoose');
const { responseReturn } = require('../../utils/response');

class HomeControllers {

  // Function to format products into arrays of arrays
  formatProduct = (products) => {
    const productArray = [];
    let i = 0;
    while (i < products.length) {
      let temp = [];
      let j = i;
      while (j < i + 3) {
        if (products[j]) {
          temp.push(products[j]);
        }
        j++;
      }
      productArray.push([...temp]);
      i = j;
    }
    return productArray;
  }

  // Get all categories
  getCategories = async (req, res) => {
    try {
      const categories = await categoryModel.find({});
      responseReturn(res, 200, { categories });
    } catch (error) {
      console.log(error.message);
    }
  }

  // Get various types of products
  getProducts = async (req, res) => {
    try {
      const products = await productModel.find({}).limit(16).sort({ createdAt: -1 });
      const allProduct1 = await productModel.find({}).limit(9).sort({ createdAt: -1 });
      const latestProduct = this.formatProduct(allProduct1);

      const allProduct2 = await productModel.find({}).limit(9).sort({ rating: -1 });
      const topRatedProduct = this.formatProduct(allProduct2);

      const allProduct3 = await productModel.find({}).limit(9).sort({ discount: -1 });
      const discountProduct = this.formatProduct(allProduct3);

      responseReturn(res, 200, { products, latestProduct, topRatedProduct, discountProduct });
    } catch (error) {
      console.log(error.message);
    }
  }

  // Get details of a single product
  getProduct = async (req, res) => {
    const { slug } = req.params;
    try {
      const product = await productModel.findOne({ slug });
      const relatedProducts = await productModel.find({
        $and: [
          { _id: { $ne: product.id } },
          { category: { $eq: product.category } }
        ]
      }).limit(20);
      const moreProducts = await productModel.find({
        $and: [
          { _id: { $ne: product.id } },
          { sellerId: { $eq: product.sellerId } }
        ]
      }).limit(3);
      responseReturn(res, 200, { product, relatedProducts, moreProducts });
    } catch (error) {
      console.log(error.message);
    }
  }

  // Get products within a price range
  priceRangeProduct = async (req, res) => {
    try {
      const priceRange = { low: 0, high: 0 };
      const products = await productModel.find({}).limit(9).sort({ createdAt: -1 });
      const latestProduct = this.formatProduct(products);

      const getForPrice = await productModel.find({}).sort({ 'price': 1 });
      if (getForPrice.length > 0) {
        priceRange.high = getForPrice[getForPrice.length - 1].price;
        priceRange.low = getForPrice[0].price;
      }
      responseReturn(res, 200, { latestProduct, priceRange });
    } catch (error) {
      console.log(error.message);
    }
  }

  // Query products based on various parameters
  queryProducts = async (req, res) => {
    const parPage = 12;
    req.query.parPage = parPage;
    try {
      const products = await productModel.find({}).sort({ createdAt: -1 });
      const totalProduct = new queryProducts(products, req.query).categoryQuery().searchQuery().priceQuery().ratingQuery().sortByPrice().countProducts();

      const result = new queryProducts(products, req.query).categoryQuery().searchQuery().ratingQuery().priceQuery().sortByPrice().skip().limit().getProducts();

      responseReturn(res, 200, { products: result, totalProduct, parPage });
    } catch (error) {
      console.log(error.message);
    }
  }

  // Submit a product review
  submitReview = async (req, res) => {
    const { name, rating, review, productId } = req.body;
    try {
      await reviewModel.create({
        productId,
        name,
        rating,
        review,
        date: moment(Date.now()).format('LL')
      });

      let totalRating = 0;
      const reviews = await reviewModel.find({ productId });
      for (let i = 0; i < reviews.length; i++) {
        totalRating += reviews[i].rating;
      }
      let productRating = 0;

      if (reviews.length !== 0) {
        productRating = (totalRating / reviews.length).toFixed(1);
      }

      await productModel.findByIdAndUpdate(productId, { rating: productRating });

      responseReturn(res, 201, { message: "Review Success" });
    } catch (error) {
      console.log(error);
    }
  }

  // Get product reviews
  getReviews = async (req, res) => {
    const { productId } = req.params;
    let { pageNo } = req.query;
    pageNo = parseInt(pageNo);
    const limit = 5;
    const skipPage = limit * (pageNo - 1);
    try {
      let getRating = await reviewModel.aggregate([
        { $match: { productId: { $eq: new ObjectId(productId) }, rating: { $not: { $size: 0 } } } },
        { $unwind: "$rating" },
        { $group: { _id: "$rating", count: { $sum: 1 } } }
      ]);

      let ratingReview = [
        { rating: 5, sum: 0 },
        { rating: 4, sum: 0 },
        { rating: 3, sum: 0 },
        { rating: 2, sum: 0 },
        { rating: 1, sum: 0 }
      ];

      for (let i = 0; i < ratingReview.length; i++) {
        for (let j = 0; j < getRating.length; j++) {
          if (ratingReview[i].rating === getRating[j]._id) {
            ratingReview[i].sum = getRating[j].count;
            break;
          }
        }
      }

      const getAll = await reviewModel.find({ productId });
      const reviews = await reviewModel.find({ productId }).skip(skipPage).limit(limit).sort({ createdAt: -1 });

      responseReturn(res, 200, { reviews, totalReview: getAll.length, ratingReview });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new HomeControllers();
