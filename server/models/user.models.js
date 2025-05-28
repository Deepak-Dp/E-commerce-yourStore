const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

   name:{
    type: String,
    required: [true, "Provide name"]
   },
   email:{
    type:String,
    required: [true, " Provide email"],
    unique: true

   },

   password:{
    type: String,
    required: [true, "Provide password"]
   },

   avatar:{
    type: String,
    default:""
   },
   mobile:{
    type: String,
    default: null
   },
   refresh_token:{
    type: String,
    default: ""
   },

   verify_email:{
    type: Boolean,
    default: false
   },

   last_login_data:{
        type: Date,
        default: ""

   },

   status:{
     
    type: String,
    enum: ['Active', 'Inactive', 'Suspended'],
    default: 'Active'
   },
   address_details:[
    {
        type: mongoose.Schema.ObjectId,
        ref: 'address'
    }

   ],

   shopping_cart:[
    {
        type: mongoose.Schema.ObjectId,
        ref: 'cartProduct'
    },
    
   ],

   adminProductsLists:[
    {
        type: mongoose.Schema.ObjectId,
        ref: 'product'
    }
   ],
   orderHistory:[
    {
        type: mongoose.Schema.ObjectId,
        ref: 'order'
    },
    
   ],
   forgot_password_otp:{
    type: String,
    default: null
   },

   forgot_password_expiry:{
    type: Date,
    default: ''
   },
    role:{
     type: String,
     enum: ['User', 'Admin'],
     default: 'User'
    }


},
{
    timestamps: true
}
);

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;