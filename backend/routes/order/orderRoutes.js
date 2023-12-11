const router = require('express').Router()
const orderController = require('../../controllers/order/orderController')

//  Order processing for customer
router.post('/home/order/place-order', orderController.place_order)
router.get('/home/customer/get-dashboard-data/:userId', orderController.get_customer_databorad_data)
router.get('/home/customer/get-orders/:customerId/:status', orderController.get_orders)
router.get('/home/customer/get-order/:orderId', orderController.get_order)



module.exports = router