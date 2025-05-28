const express = require('express')
const { cashOnDeliveryController, getUsersOrderController, getAdminOrderController, updateOrderStatusController, onLinePaymentController } = require('../controller/order.controller');
const auth= require('../middleware/auth')
const routes = express.Router();


routes.post('/cash-on-delivery', auth , cashOnDeliveryController);
routes.get('/order-list', auth , getUsersOrderController);
routes.get('/admin-order-list', auth , getAdminOrderController);
routes.put("/update-order-status",updateOrderStatusController)
routes.post('/checkout', auth, onLinePaymentController)

module.exports = routes;