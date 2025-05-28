const express = require('express')
const uploadImageController = require('../controller/uploadImage.controller')
const Route = express.Router()

Route.post("/upload", uploadImageController)

module.exports = Route