const customerModel = require('../../models/customerModel');
const { responseReturn } = require('../../utils/response');
const { createToken } = require('../../utils/tokenCreate');
const sellerCustomerModel = require('../../models/chat/sellerCustomerModel');
const bcrypt = require('bcrypt');

class CustomerAuthController {
  // Function to register a new customer
  customerRegister = async (req, res) => {
    const { name, email, password } = req.body;

    try {
      // Check if the email already exists
      const customer = await customerModel.findOne({ email });

      if (customer) {
        responseReturn(res, 404, { error: 'Email already exists' });
      } else {
        // Create a new customer
        const createdCustomer = await customerModel.create({
          name: name.trim(),
          email: email.trim(),
          password: await bcrypt.hash(password, 10),
          method: 'manual',
        });

        // Create a corresponding entry in the seller-customer model
        await sellerCustomerModel.create({
          myId: createdCustomer.id,
        });

        // Create and send a JWT token for authentication
        const token = await createToken({
          id: createdCustomer.id,
          name: createdCustomer.name,
          email: createdCustomer.email,
          method: createdCustomer.method,
        });

        // Set the token in a cookie with an expiration time
        res.cookie('customerToken', token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });

        responseReturn(res, 201, { message: 'Registration successful', token });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Function for customer login
  customerLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
      // Find the customer by email
      const customer = await customerModel.findOne({ email }).select('+password');

      if (customer) {
        // Compare the provided password with the stored hashed password
        const match = await bcrypt.compare(password, customer.password);

        if (match) {
          // If passwords match, create and send a JWT token for authentication
          const token = await createToken({
            id: customer.id,
            name: customer.name,
            email: customer.email,
            method: customer.method,
          });

          // Set the token in a cookie with an expiration time
          res.cookie('customerToken', token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });

          responseReturn(res, 201, { message: 'Login successful', token });
        } else {
          responseReturn(res, 404, { error: 'Incorrect password' });
        }
      } else {
        responseReturn(res, 404, { error: 'Email not found' });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Function for customer logout
  customerLogout = async (req, res) => {
    // Clear the customer token cookie
    res.cookie('customerToken', '', {
      expires: new Date(Date.now()),
    });

    responseReturn(res, 200, { message: 'Logout successful' });
  };
}

module.exports = new CustomerAuthController();
