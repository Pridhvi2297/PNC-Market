const jwt = require('jsonwebtoken');

module.exports.authMiddleware = async (req, res, next) => {
    const { accessToken } = req.cookies;

    try {
        if (!accessToken) {
            throw new Error('Please login to access');
        }

        const decodedToken = await jwt.verify(accessToken, process.env.SECRET);
        req.role = decodedToken.role;
        req.id = decodedToken.id;
        next();
    } catch (error) {
        // Centralized error handling
        return res.status(401).json({ error: error.message });
    }
};
