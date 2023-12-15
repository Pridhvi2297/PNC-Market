const jwt = require("jsonwebtoken");

module.exports.createToken = async (data) => jwt.sign(data, process.env.SECRET, { expiresIn: "7d" });
