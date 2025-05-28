const User = require("../models/user.models");
const bcryptjs = require("bcryptjs");
const sendEmail = require("../config/sendEmail");
const verifyEmailTamplate = require("../utils/verifyEmailTemplates");
const generateAccesstoken = require("../utils/generateAccesstoken");
const generaterefreshToken = require("../utils/generaterefreshToken");
const uploadToCloudinary = require("../utils/uploadImageCloudinary");
const generateOtp = require('../utils/genearteOTP')

const forgotPassword = require("../utils/forgotpasswordmail");


require("dotenv").config();
exports.registerUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({
        message: "Provide name and password...",
        error: true,
        success: false,
      });
    }

    const alreadyRegisterUser = await User.findOne({ email });

    if (alreadyRegisterUser) {
      return res.json({
        message: "Already register User with this email",
        success: false,
        error: false,
      });
    }

    const hashPassWord = await bcryptjs.hash(password, 10);

    const payload = {
      name,
      email,
      password: hashPassWord,
    };

    const newUser = new User(payload);
    const save = await newUser.save();

    const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code =${save?._id}`;

    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: "Verify Email from yourStore",
      html: verifyEmailTamplate({
        name,
        url: verifyEmailUrl,
      }),
    });

    return res.status(200).json({
      message: "user register successfully",
      data: save,
      error: false,
      success: true,
    });
  } catch (err) {
    return res.status(501).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

exports.verifyEmailController = async (req, res) => {
  try {
    const { code } = req.body;
    const user = await User.findById({ _id: code });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    const updateUser = await User.updateOne(
      { _id: code },
      {
        verify_email: true,
      }
    );

    return res.status(200).json({
      message: "Email verified successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// login controller

exports.loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
     
     
    if (!email || !password) {
      return res.json({
        message : "Provide email and password..",
        error: true,
        success: false,
      });
    }

    const user = await User.findOne({ email });
     
    if(!user){
      return res.json({
        message : "User not found..",
        error: true,
        success: false,
      });
    }

    if (user?.status !== "Active") {
      return res.status(401).json({
        message : "Your account is not active..",
        error: true,
        success: false,
      });
    }
    
    const isMatch = await bcryptjs.compare(password, user?.password);
    if (!isMatch) {
      return res.json({
        message : "Invalid password..",
        error: true,
        success: false,
      });
    }
    
    

    const accessToken = await generateAccesstoken(user?._id);
    const refreshToken = await generaterefreshToken(user?._id);

    const updateUser = await User.findByIdAndUpdate(user?._id, {
      last_login_data : new Date()
    })

    res.cookie("Accesstoken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.cookie("Refreshtoken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

   
    

    return res.status(200).json({
      message: "Login successfully",
      data: {
        accessToken,
        refreshToken,
        userId: user._id,
        userName: user.name,
        userImage: user.avatar
        
        
      },
      error: false,
      success: true,
    });

  } catch (error) {
    return res.status(501).json({
      message: error.message || error,
     
      success: false,
    });
  }
};


// logout controller

exports.logoutController = async(req, res) =>{
  try {
   
     const userid = req.userId

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None"
    }

    res.clearCookie("Accesstoken", cookiesOption);
    res.clearCookie("Refreshtoken", cookiesOption);

    const removerefreshToken = await User.findByIdAndUpdate(userid,{
      refresh_token: ""
    }) 

    return res.status(200).json({
      message: "Logout successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}


//upload user avatar

exports.uploadAvatar= async(req,res)=>{
  try {
      const userId = req.userId // auth middlware
      const image = req.files.avatar 
      
      
      

      const upload = await uploadToCloudinary(image, "yourStore")
       
       
      const updateUser = await User.findByIdAndUpdate(userId,{
          avatar : upload.secure_url
      })

      return res.json({
          message : "Avatar uploaded successfully",
          success : true,
          error : false,
          data : {
              _id : userId,
              avatar : upload.secure_url
          }
      })

  } catch (error) {
      return res.status(500).json({
          message : error.message || error,
          error : true,
          success : false
      })
  }
}


//update user profile

exports.updateUserDetails = async (req, res)=>{

  try {

    const userId = req.userId;

    const {name,  password, mobile} = req.body;

    let hashPassWord =''

   if(password){
     hashPassWord = await bcryptjs.hash(password, 10);
   }
   

    const updateUser = await User.updateOne({_id:userId},{
      ...(name && {name:name}),
      
      ...(password && {password: hashPassWord}),
      ...(mobile && {mobile: mobile})
    })

    return res.status(200).json({
      message: "User details updated successfully",
      success: true,
      error: false,
      data: updateUser
    })


    
    
    
  } catch (error) {
    console.log(error);
    
    return res.status(501).json({
      message: error.message || error,
      success: false,
      error: true
    })
  }
}


// forgot password user not login

exports.forgotPasswordController = async (req,res) => {

   try {

    const {email} = req.body;

    if(!email)
    {
      return res.json({
        message: "Pleace Provide Eamil",
        success: false,
        error: true
      })
    }

    const user = await User.findOne({email})

    if(!user){
      return res.json({
        message: "User not define",
        success: false
      })
    }

    const otp = generateOtp();

    const expireTime = new Date() + 60 * 60 *1000 // 1hr

    const update = await User.findByIdAndUpdate(user._id, {
      forgot_password_otp: otp,
      forgot_password_expiry: new Date(expireTime).toISOString()
    })

    await sendEmail({
      sendTo: email,
      subject: "Forgot Password from yourStore",
      html: forgotPassword(user.name, otp)
      
    })

    return res.status(200).json({
      message: " Successfully send OTP on your email",
      success: true,
      error: false
    })





    
   } catch (error) {

    console.log(error);


    return res.status(501).json({
      message : error.message || error,
      success: false,
      error: true
    })
    
    
   }
  
}


// verify otp 

exports.verifyOtpController = async (req, res) =>{

  try {

    const {email, otp} = req.body;

    if(!email || !otp){
      return res.json({
        message:"pleace provide email and otp",
        success: false

      })
    }

    const user = await User.findOne({email})

    if(!user){
      return res.json({
        message: "user not define",
        success: false
      })
    }

    const currentTime = new Date().toISOString();

    if(user.forgot_password_expiry < currentTime){
     
     
      return res.json({
             message: "your OTP has been expired",
              success: false
      })
     }

     if(otp !== user.forgot_password_otp){
      return res.json({
        message: 'Invalid OTP',
        success: false
      })
     }

     const updateUser = await User.findByIdAndUpdate(user?._id, {
      forgot_password_otp: "",
      forgot_password_expiry: ""
     })

     return res.status(201).json({
      message: "OTP verification successfull",
      success: true
     })



    
  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true
    })
    
    
  }

}


// reset password

exports.resetPassword = async (req, res) =>{
  try {

    const {email, newPassword, confirmPassword} = req.body;

    if(!email || !newPassword || !confirmPassword){
      return res.json({
        message: "Provide email newPassword and confirmPassword",
        success: false
      })
    }

    const user = await User.findOne({email});

    if(!user){
       return res.json({
        message: "user not define",
        success: false

       })
    }

    if(newPassword !== confirmPassword){
      return res.json({
        message: "newPassword and confirmPassword must be same.",
        success: false
      })
    }

    const hashpassword = await bcryptjs.hash(newPassword, 10);

    const updateUser = await User.updateOne({_id: user._id},{
      password: hashpassword
    })


    return res.status(202).json({
      message: "Password update successfully.",
      success: true,
      data: updateUser
    })


    
  } catch (error) {
   console.log(error);
   
    return res.status(500).json({
      message: error.message,
      success: false
    })
    
 }
}

exports.getUserController = async (req, res) =>{

  try {

    const userId = req.userId

    console.log(userId);

    const user = await User.findById(userId).select('-password -refresh_token')
    console.log(user);
    

    return res.json({
      success : true,
      message: "successfully get user details",
      data: user
    })
    
    
  } catch (error) {
    console.log(error);
   
    return res.status(500).json({
      message: error.message,
      success: false
    })
    
    
  }
}

