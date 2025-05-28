const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
       
    }, 
    userId:{
       type: String
    },
    image:{
        type: Array,
        default: []
    },
   
    category:[
         {
            type: mongoose.Schema.ObjectId,
            ref: 'category'
         }
    ],

    brand:{
       type :String
    },

    color:{
          type:String
    },

    

   


    unit:{
        type: String,
        default:""
    },

    stock:{
        type: Number,
        default:null
    },
    price:{
        type: Number,
        default: null
    },
    discount:{
        type: Number,
        default: null
    },
    description:{
        type: String,
        default: ''
    },
    more_details:{
        type: Object,
        default:{}
    },

    publish:{
        type: Boolean,
        default: true
    }



   
},
{
    timestamps: true
});  

const productModel = mongoose.model("product", productSchema)

module.exports = productModel