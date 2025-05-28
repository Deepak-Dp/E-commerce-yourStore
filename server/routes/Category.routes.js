const express = require('express')
const { AddCategoryController, getAdminsCategoryController, deleteCategoryController, getAllCategory } = require('../controller/category.controller')
const auth= require('../middleware/auth')
const Routes = express.Router()


Routes.post('/add',auth ,AddCategoryController)
Routes.get('/fatch-AdminCategoorys', auth, getAdminsCategoryController)
Routes.delete('/remove-category/:_id',  deleteCategoryController)
Routes.get('/get',getAllCategory)




module.exports = Routes