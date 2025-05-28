const express= require('express')
const auth= require('../middleware/auth')
const { addCartItemController, getCartItemController, removeCartProductController, updateCartProductController } = require('../controller/cart.controller')
const Routes = express.Router()


Routes.post('/add', auth, addCartItemController)
Routes.get('/get',auth, getCartItemController)
Routes.delete('/delete-cart-item/:_id', removeCartProductController)
Routes.put('/updata-cart-item/:_id',updateCartProductController)



module.exports = Routes