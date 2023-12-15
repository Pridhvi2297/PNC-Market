const adminModel = require('../models/adminModel');
const sellerModel = require('../models/sellerModel');
const sellerCustomerModel = require('../models/chat/sellerCustomerModel');
const bcrypt = require('bcrypt');
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;
const { responseReturn } = require('../utils/response');
const { createToken } = require('../utils/tokenCreate');

class AuthControllers {
  
  // Function for admin login
  adminLogin = async (req, res) => {
    const { email, password } = req.body;
    
    try {
      const admin = await adminModel.findOne({ email }).select('+password');
      
      if (admin) {
        const match = await bcrypt.compare(password, admin.password);
        
        if (match) {
          const token = await createToken({
            id: admin.id,
            role: admin.role
          });
          
          res.cookie('accessToken', token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          });

          responseReturn(res, 200, { token, message: 'Login success' });
        } else {
          responseReturn(res, 404, { error: "Password wrong" });
        }
      } else {
        responseReturn(res, 404, { error: "Email not found" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  }

  // Function for seller login
  sellerLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
      const seller = await sellerModel.findOne({ email }).select('+password');

      if (seller) {
        const match = await bcrypt.compare(password, seller.password);

        if (match) {
          const token = await createToken({
            id: seller.id,
            role: seller.role
          });

          res.cookie('accessToken', token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          });

          responseReturn(res, 200, { token, message: 'Login success' });
        } else {
          responseReturn(res, 404, { error: "Password wrong" });
        }
      } else {
        responseReturn(res, 404, { error: "Email not found" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  }

  // Function for seller registration
  sellerRegister = async (req, res) => {
    const { email, name, password } = req.body;

    try {
      const userExists = await sellerModel.findOne({ email });

      if (userExists) {
        responseReturn(res, 404, { error: 'Email already exists' });
      } else {
        const seller = await sellerModel.create({
          name,
          email,
          password: await bcrypt.hash(password, 10),
          method: 'manually',
          shopInfo: {}
        });

        await sellerCustomerModel.create({
          myId: seller.id
        });

        const token = await createToken({ id: seller.id, role: seller.role });

        res.cookie('accessToken', token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });

        responseReturn(res, 201, { token, message: 'Registration success' });
      }
    } catch (error) {
      responseReturn(res, 500, { error: 'Internal server error' });
    }
  }

  // Function to get user information (admin or seller)
  getUser = async (req, res) => {
    const { id, role } = req;

    try {
      const user = role === 'admin' ? await adminModel.findById(id) : await sellerModel.findById(id);
      responseReturn(res, 200, { userInfo: user });
    } catch (error) {
      responseReturn(res, 500, { error: 'Internal server error' });
    }
  }

  // Function to upload a profile image
  profileImageUpload = async (req, res) => {
    const { id } = req;
    const form = formidable({ multiples: true });

    form.parse(req, async (err, _, files) => {
      cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret,
        secure: true
      });

      const { image } = files;

      try {
        const result = await cloudinary.uploader.upload(image.filepath, { folder: 'profile' });

        if (result) {
          await sellerModel.findByIdAndUpdate(id, { image: result.url });

          const userInfo = await sellerModel.findById(id);
          responseReturn(res, 201, { message: 'Image upload success', userInfo });
        } else {
          responseReturn(res, 404, { error: 'Image upload failed' });
        }
      } catch (error) {
        responseReturn(res, 500, { error: error.message });
      }
    });
  }

  // Function to add profile information
  profileInfoAdd = async (req, res) => {
    const { division, district, shopName, sub_district } = req.body;
    const { id } = req;

    try {
      await sellerModel.findByIdAndUpdate(id, {
        shopInfo: {
          shopName,
          division,
          district,
          sub_district
        }
      });

      const userInfo = await sellerModel.findById(id);
      responseReturn(res, 201, { message: 'Profile info add success', userInfo });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  }

  // Function for user logout
  logout = async (req, res) => {
    try {
      res.cookie('accessToken', null, {
        expires: new Date(Date.now()),
        httpOnly: true
      });

      responseReturn(res, 200, { message: 'Logout success' });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  }
}

module.exports = new AuthControllers();
