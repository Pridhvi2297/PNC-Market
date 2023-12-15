const stripeModel = require('../../models/stripeModel');
const sellerModel = require('../../models/sellerModel');
const sellerWallet = require('../../models/sellerWallet');
const myShopWallet = require('../../models/myShopWallet');
const withdrowRequest = require('../../models/withdrowRequest');
const { responseReturn } = require('../../utils/response');
const { mongo: { ObjectId } } = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')('sk_test_51OL0XOG6sJWTPliWcgntdqMCqYw2cd0uV92M1IioNUjE3rQQotHLFmxY0CQgd3IxNsxs2WkHxYYRGn21PSUCqhm200dxwzpyFB');

class PaymentController {
  
  // Function to create or update a Stripe Connect account for a seller
  createStripeConnectAccount = async (req, res) => {
    const { id } = req;
    const uid = uuidv4();

    try {
      const stripeInfo = await stripeModel.findOne({ sellerId: id });

      // If existing Stripe info found, delete and create a new one
      if (stripeInfo) {
        await stripeModel.deleteOne({ sellerId: id });
      }

      const account = await stripe.accounts.create({ type: 'express' });

      const accountLink = await stripe.accountLinks.create({
        account: account.id,
        refresh_url: 'http://localhost:3001/refresh',
        return_url: `http://localhost:3001/success?activeCode=${uid}`,
        type: 'account_onboarding'
      });

      await stripeModel.create({
        sellerId: id,
        stripeId: account.id,
        code: uid
      });

      responseReturn(res, 201, { url: accountLink.url });
    } catch (error) {
      console.log('Stripe Connect account creation error: ' + error.message);
    }
  }

  // Function to activate a Stripe Connect account for a seller
  activeStripeConnectAccount = async (req, res) => {
    const { activeCode } = req.params;
    const { id } = req;

    try {
      const userStripeInfo = await stripeModel.findOne({ code: activeCode });

      if (userStripeInfo) {
        await sellerModel.findByIdAndUpdate(id, { payment: 'active' });
        responseReturn(res, 200, { message: 'Payment activated' });
      } else {
        responseReturn(res, 404, { message: 'Payment activation failed' });
      }
    } catch (error) {
      responseReturn(res, 500, { message: 'Internal server error' });
    }
  }

  // Function to calculate the sum of amounts in an array of data
  sumAmount = (data) => {
    return data.reduce((sum, item) => sum + item.amount, 0);
  }

  // Function to get payment details for a seller
  getSellerPaymentDetails = async (req, res) => {
    const { sellerId } = req.params;

    try {
      const payments = await sellerWallet.find({ sellerId });

      const pendingWithdrawals = await withdrowRequest.find({ sellerId, status: 'pending' });
      const successWithdrawals = await withdrowRequest.find({ sellerId, status: 'success' });

      const pendingAmount = this.sumAmount(pendingWithdrawals);
      const withdrawAmount = this.sumAmount(successWithdrawals);
      const totalAmount = this.sumAmount(payments);

      let availableAmount = totalAmount - (pendingAmount + withdrawAmount);
      
      if (totalAmount <= 0) {
        availableAmount = 0;
      }

      responseReturn(res, 200, {
        totalAmount,
        pendingAmount,
        withdrawAmount,
        availableAmount,
        successWithdrawals,
        pendingWithdrawals
      });

    } catch (error) {
      console.log(error.message);
    }
  }

  // Function to create a withdrawal request
  withdrawalRequest = async (req, res) => {
    const { amount, sellerId } = req.body;

    try {
      const withdrawal = await withdrowRequest.create({
        sellerId,
        amount: parseInt(amount)
      });

      responseReturn(res, 200, { withdrawal, message: 'Withdrawal request sent' });
    } catch (error) {
      responseReturn(res, 500, { message: 'Internal server error' });
    }
  }

  // Function to get pending payment requests
  getPaymentRequests = async (req, res) => {
    try {
      const withdrawalRequests = await withdrowRequest.find({ status: 'pending' });
      responseReturn(res, 200, { withdrawalRequests });
    } catch (error) {
      responseReturn(res, 500, { message: 'Internal server error' });
    }
  }

  // Function to confirm a payment request
  paymentRequestConfirm = async (req, res) => {
    const { paymentId } = req.body;

    try {
      const payment = await withdrowRequest.findById(paymentId);
      const { stripeId } = await stripeModel.findOne({ sellerId: new ObjectId(payment.sellerId) });

      await stripe.transfers.create({
        amount: payment.amount * 100,
        currency: 'usd',
        destination: stripeId
      });

      await withdrowRequest.findByIdAndUpdate(paymentId, { status: 'success' });

      responseReturn(res, 200, { payment, message: 'Request confirmed successfully' });
    } catch (error) {
      console.log(error);
      responseReturn(res, 500, { message: 'Internal server error' });
    }
  }
}

module.exports = new PaymentController();
