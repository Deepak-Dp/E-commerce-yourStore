const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({

      address_line:{
        type: String,
       default: ''
      },
      city:{
        type:String,
        default: ''
      },
      state:{
        type: String,
        default: ''
      },
      pincode:{
        type: String,
        default: ''             
      },

      country:{
        type: String,
        default: ''
      },
      mobile:{
        type: Number,
        default: null
      },
     userId: {
         type:String,
          required: true
      },
      status:{
        type: Boolean,
        default: true
      }


},{timestamps: true});

const addressmodel = mongoose.model('address', addressSchema);
module.exports = addressmodel;