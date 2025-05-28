const express = require('express');
const {registerUserController,verifyEmailController,resetPassword,getUserController , verifyOtpController, loginUserController,forgotPasswordController, logoutController, uploadAvatar,updateUserDetails} = require('../controller/user.controller');
const auth = require('../middleware/auth');

const Router = express.Router()


Router.post('/register', registerUserController );
Router.post('/verify-Email', verifyEmailController );
Router.post('/login', loginUserController );
Router.get('/logout',auth,  logoutController);
Router.put('/upload-avatar', auth,uploadAvatar);
Router.put('/updateUserDetails',auth, updateUserDetails)
Router.put('/forgot-password', forgotPasswordController)
Router.put('/verify-otp', verifyOtpController);
Router.put('/reset-Password', resetPassword);
Router.get('/get-user', auth, getUserController)

module.exports = Router