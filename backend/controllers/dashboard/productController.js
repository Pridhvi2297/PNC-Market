const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;
const productModel = require('../../models/productModel');
const { responseReturn } = require('../../utils/response');

class ProductController {
    // Function to add a new product
    addProduct = async (req, res) => {
        const { id } = req;
        const form = formidable({ multiples: true });

        form.parse(req, async (err, field, files) => {
            let { name, category, description, stock, price, discount, shopName, brand } = field;
            const { images } = files;
            name = name.trim();
            const slug = name.split(' ').join('-');

            // Configure Cloudinary
            cloudinary.config({
                cloud_name: process.env.cloud_name,
                api_key: process.env.api_key,
                api_secret: process.env.api_secret,
                secure: true
            });

            try {
                const allImageUrl = await Promise.all(images.map(async (image) => {
                    const result = await cloudinary.uploader.upload(image.filepath, { folder: 'products' });
                    return result.url;
                }));

                await productModel.create({
                    sellerId: id,
                    name,
                    slug,
                    shopName,
                    category: category.trim(),
                    description: description.trim(),
                    stock: parseInt(stock),
                    price: parseInt(price),
                    discount: parseInt(discount),
                    images: allImageUrl,
                    brand: brand.trim()
                });

                responseReturn(res, 201, { message: "Product added successfully" });
            } catch (error) {
                responseReturn(res, 500, { error: error.message });
            }
        });
    }

    // Function to get products with optional pagination and search
    getProducts = async (req, res) => {
        const { page, searchValue, perPage } = req.query;
        const { id } = req;
        const skipPage = parseInt(perPage) * (parseInt(page) - 1);

        try {
            const query = searchValue ? { $text: { $search: searchValue }, sellerId: id } : { sellerId: id };

            const products = await productModel.find(query).skip(skipPage).limit(perPage).sort({ createdAt: -1 });
            const totalProduct = await productModel.find(query).countDocuments();

            responseReturn(res, 200, { totalProduct, products });
        } catch (error) {
            console.log(error.message);
            responseReturn(res, 500, { error: 'Internal server error' });
        }
    }

    // Function to get a single product by ID
    getProduct = async (req, res) => {
        const { productId } = req.params;

        try {
            const product = await productModel.findById(productId);
            responseReturn(res, 200, { product });
        } catch (error) {
            console.log(error.message);
        }
    }

    // Function to update product details
    updateProduct = async (req, res) => {
        let { name, description, discount, price, brand, productId, stock } = req.body;
        name = name.trim();
        const slug = name.split(' ').join('-');

        try {
            await productModel.findByIdAndUpdate(productId, {
                name, description, discount, price, brand, productId, stock, slug
            });

            const product = await productModel.findById(productId);
            responseReturn(res, 200, { product, message: 'Product updated successfully' });
        } catch (error) {
            responseReturn(res, 500, { error: error.message });
        }
    }

    // Function to update product images
    updateProductImages = async (req, res) => {
        const form = formidable({ multiples: true });

        form.parse(req, async (err, field, files) => {
            const { productId, oldImage } = field;
            const { newImage } = files;

            if (err) {
                responseReturn(res, 404, { error: err.message });
            } else {
                try {
                    // Configure Cloudinary
                    cloudinary.config({
                        cloud_name: process.env.cloud_name,
                        api_key: process.env.api_key,
                        api_secret: process.env.api_secret,
                        secure: true
                    });

                    const result = await cloudinary.uploader.upload(newImage.filepath, { folder: 'products' });

                    if (result) {
                        let { images } = await productModel.findById(productId);
                        const index = images.findIndex(img => img === oldImage);
                        images[index] = result.url;

                        await productModel.findByIdAndUpdate(productId, { images });

                        const product = await productModel.findById(productId);
                        responseReturn(res, 200, { product, message: 'Product image update success' });
                    } else {
                        responseReturn(res, 404, { error: 'Image upload failed' });
                    }
                } catch (error) {
                    responseReturn(res, 404, { error: error.message });
                }
            }
        });
    }
}

module.exports = new ProductController();
