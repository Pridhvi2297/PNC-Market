const router = require("express").Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const authControllers = require("../controllers/authControllers");
router.post('/seller-register', authControllers.seller_register)

router.post("/admin-login", authControllers.admin_login);
router.get('/get-user', authMiddleware, authControllers.getUser);

module.exports = router;
