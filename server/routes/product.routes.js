const express = require('express')
const { addProductController, getAdminProductsController, removeProductController, getAllProductController, updateProductDateController,getProductsDetailsController } = require('../controller/product.controller')
const auth = require('../middleware/auth')
const Routes = express.Router()



Routes.post('/add',auth ,addProductController)
Routes.get('/get-AdminProducts', auth, getAdminProductsController)
Routes.delete('/delete-Product/:_id', removeProductController)
Routes.put('/update-product', updateProductDateController)
Routes.get('/get',getAllProductController)
Routes.get('/get-productDetails/:_id', getProductsDetailsController)

module.exports = Routes