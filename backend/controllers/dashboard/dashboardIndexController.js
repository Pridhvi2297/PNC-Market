const authorOrder = require('../../models/authOrder');
const customerOrder = require('../../models/customerOrder');
const sellerWallet = require('../../models/sellerWallet');
const myShopWallet = require('../../models/myShopWallet');
const sellerModel = require('../../models/sellerModel');
const adminSellerMessage = require('../../models/chat/adminSellerMessage');
const sellerCustomerMessage = require('../../models/chat/sellerCustomerMessage');
const productModel = require('../../models/productModel');
const { mongo: { ObjectId } } = require('mongoose');
const { responseReturn } = require('../../utils/response');

// Function to get data for seller dashboard
module.exports.getSellerDashboardData = async (req, res) => {
    const { id } = req;

    try {
        // Total sales for the seller
        const totalSale = await sellerWallet.aggregate([
            {
                $match: {
                    sellerId: {
                        $eq: id
                    }
                }
            }, {
                $group: {
                    _id: null,
                    totalAmount: { $sum: '$amount' }
                }
            }
        ]).then(results => results.length > 0 ? results[0].totalAmount : 0);

        // Total products listed by the seller
        const totalProduct = await productModel.find({
            sellerId: new ObjectId(id)
        }).countDocuments();

        // Total orders placed with the seller
        const totalOrder = await authorOrder.find({
            sellerId: new ObjectId(id)
        }).countDocuments();

        // Total pending orders for the seller
        const totalPendingOrder = await authorOrder.find({
            sellerId: new ObjectId(id),
            delivery_status: 'pending'
        }).countDocuments();

        // Recent messages with customers
        const messages = await sellerCustomerMessage.find({
            $or: [{
                    senderId: id
                },
                {
                    receverId: id
                }
            ]
        }).limit(3);

        // Recent orders placed with the seller
        const recentOrders = await authorOrder.find({
            sellerId: new ObjectId(id)
        }).limit(5);

        responseReturn(res, 200, {
            totalOrder,
            totalSale,
            totalPendingOrder,
            messages,
            recentOrders,
            totalProduct
        });
    } catch (error) {
        console.error('Error getting seller dashboard data: ', error.message);
        responseReturn(res, 500, {
            error: 'Internal server error'
        });
    }
}

// Function to get data for admin dashboard
module.exports.getAdminDashboardData = async (req, res) => {
    const { id } = req;

    try {
        // Total sales across all sellers
        const totalSale = await myShopWallet.aggregate([
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: '$amount' }
                }
            }
        ]).then(results => results.length > 0 ? results[0].totalAmount : 0);

        // Total products listed by all sellers
        const totalProduct = await productModel.find({}).countDocuments();

        // Total orders placed by customers
        const totalOrder = await customerOrder.find({}).countDocuments();

        // Total number of sellers
        const totalSeller = await sellerModel.find({}).countDocuments();

        // Recent messages with sellers
        const messages = await adminSellerMessage.find({}).limit(3);

        // Recent orders placed by customers
        const recentOrders = await customerOrder.find({}).limit(5);

        responseReturn(res, 200, {
            totalOrder,
            totalSale,
            totalSeller,
            messages,
            recentOrders,
            totalProduct
        });

    } catch (error) {
        console.error('Error getting admin dashboard data: ', error.message);
        responseReturn(res, 500, {
            error: 'Internal server error'
        });
    }
}
