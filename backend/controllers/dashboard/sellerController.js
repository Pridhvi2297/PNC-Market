const sellerModel = require('../../models/sellerModel');
const { responseReturn } = require('../../utils/response');

class SellerController {
    // Function to get pending seller requests with optional pagination
    getSellerRequests = async (req, res) => {
        const { page, searchValue, parPage } = req.query;
        const skipPage = parseInt(parPage) * (parseInt(page) - 1);

        try {
            if (searchValue) {
                // Handling search functionality if needed in the future
            } else {
                const sellers = await sellerModel.find({ status: 'pending' }).skip(skipPage).limit(parPage).sort({ createdAt: -1 });
                const totalSeller = await sellerModel.find({ status: 'pending' }).countDocuments();

                responseReturn(res, 200, { totalSeller, sellers });
            }
        } catch (error) {
            responseReturn(res, 500, { error: error.message });
        }
    }

    // Function to get details of a specific seller by ID
    getSeller = async (req, res) => {
        const { sellerId } = req.params;

        try {
            const seller = await sellerModel.findById(sellerId);
            responseReturn(res, 200, { seller });
        } catch (error) {
            responseReturn(res, 500, { error: error.message });
        }
    }

    // Function to update seller status (Activate/Deactivate)
    updateSellerStatus = async (req, res) => {
        const { sellerId, status } = req.body;

        try {
            await sellerModel.findByIdAndUpdate(sellerId, { status });
            const seller = await sellerModel.findById(sellerId);

            responseReturn(res, 200, { seller, message: 'Seller status update success' });
        } catch (error) {
            responseReturn(res, 500, { error: error.message });
        }
    }

    // Function to get active sellers with optional pagination and search
    getActiveSellers = async (req, res) => {
        const { page, searchValue, parPage } = req.query;
        const skipPage = parPage * (page - 1);

        try {
            const query = searchValue ? { $text: { $search: searchValue }, status: 'active' } : { status: 'active' };

            const sellers = await sellerModel.find(query).skip(skipPage).limit(parPage).sort({ createdAt: -1 });
            const totalSeller = await sellerModel.find(query).countDocuments();

            responseReturn(res, 200, { totalSeller, sellers });
        } catch (error) {
            console.log('Active seller get error: ' + error.message);
        }
    }

    // Function to get inactive sellers with optional pagination and search
    getInactiveSellers = async (req, res) => {
        const { page, searchValue, parPage } = req.query;
        const skipPage = parPage * (page - 1);

        try {
            const query = searchValue ? { $text: { $search: searchValue }, status: 'inactive' } : { status: 'inactive' };

            const sellers = await sellerModel.find(query).skip(skipPage).limit(parPage).sort({ createdAt: -1 });
            const totalSeller = await sellerModel.find(query).countDocuments();

            responseReturn(res, 200, { totalSeller, sellers });
        } catch (error) {
            console.log('Inactive seller get error: ' + error.message);
        }
    }
}

module.exports = new SellerController();
