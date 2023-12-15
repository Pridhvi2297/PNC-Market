const router = require('express').Router();
const { authMiddleware } = require('../../middlewares/authMiddleware');
const categoryController = require('../../controllers/dashboard/categoryController');

// Define routes for category operations
router.post('/category-add', authMiddleware, categoryController.add_category);
router.get('/category-get', authMiddleware, categoryController.get_category);

module.exports = router;
