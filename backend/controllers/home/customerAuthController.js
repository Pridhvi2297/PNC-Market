const customerModel = require("../../models/customerModel");
const { responseReturn } = require("../../utiles/response");
const { createToken } = require("../../utiles/tokenCreate");
const sellerCustomerModel = require("../../models/chat/sellerCustomerModel");
const bcrypt = require("bcrypt");

class customerAuthController {
  customer_register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const customer = await customerModel.findOne({ email });
      if (customer) {
        responseReturn(res, 404, { error: "Email already exists" });
      } else {
        const createCustomer = await customerModel.create({
          name: name.trim(),
          email: email.trim(),
          password: await bcrypt.hash(password, 10),
          method: "manually",
        });
        await sellerCustomerModel.create({
          myId: createCustomer.id,
        });
        const token = await createToken({
          id: createCustomer.id,
          name: createCustomer.name,
          email: createCustomer.email,
          method: createCustomer.method,
        });
        res.cookie("customerToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        responseReturn(res, 201, { message: "Registration successful", token });
      }
    } catch (error) {
      console.log(error.message);
      responseReturn(res, 500, { error: "Internal Server Error" });
    }
  };
}

module.exports = new customerAuthController();
