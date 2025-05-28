const express = require('express');
const { addAdressController, getAddressController, deleteAddressController, EditAdressController } = require('../controller/address.controller');
const auth = require('../middleware/auth');
const Routes = express.Router();

Routes.post("/add-Address",auth, addAdressController)
Routes.get("/get-address",auth, getAddressController)
Routes.delete("/delete-address/:id",auth, deleteAddressController)
Routes.put("/update-address", EditAdressController)

module.exports = Routes