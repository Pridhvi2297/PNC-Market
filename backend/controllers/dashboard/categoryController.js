const categoryModel = require('../../models/categoryModel');
const { responseReturn } = require('../../utils/response');
const cloudinary = require('cloudinary').v2;
const formidable = require('formidable');

class CategoryController {

    // Add a new category
    addCategory = async (req, res) => {
        const form = formidable();

        form.parse(req, async (err, fields, files) => {
            if (err) {
                responseReturn(res, 404, { error: 'Something went wrong' });
            } else {
                let { name } = fields;
                let { image } = files;
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
                    const result = await cloudinary.uploader.upload(image.filepath, { folder: 'categories' });

                    if (result) {
                        const category = await categoryModel.create({
                            name,
                            slug,
                            image: result.url
                        });

                        responseReturn(res, 201, { category, message: 'Category added successfully' });
                    } else {
                        responseReturn(res, 404, { error: 'Image upload failed' });
                    }
                } catch (error) {
                    responseReturn(res, 500, { error: 'Internal server error' });
                }
            }
        });
    }

    // Get categories with optional pagination and search
    getCategory = async (req, res) => {
        const { page, searchValue, perPage } = req.query;

        try {
            let skipPage = '';

            if (perPage && page) {
                skipPage = parseInt(perPage) * (parseInt(page) - 1);
            }

            let categoryQuery = {};

            // Add search query if searchValue is provided
            if (searchValue) {
                categoryQuery = { $text: { $search: searchValue } };
            }

            const categorys = await categoryModel.find(categoryQuery).skip(skipPage).limit(perPage).sort({ createdAt: -1 });
            const totalCategory = await categoryModel.countDocuments(categoryQuery);

            responseReturn(res, 200, { totalCategory, categorys });
        } catch (error) {
            console.log(error.message);
            responseReturn(res, 500, { error: 'Internal server error' });
        }
    }
}

module.exports = new CategoryController();
