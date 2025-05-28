

const cartProductModel = require("../models/cartProduct.models")
const userModel = require("../models/user.models")


exports.addCartItemController = async (req, res) =>{
    try {

        const userId = req.userId;
        const {productId} = req.body;
  
    
        if(!productId) {
            return res.json({
                message : "provide product id",
                success : false
            })
        }

        const checkItemInCart = await cartProductModel.findOne({
            userId: userId,
            productId : productId
        })

        if(checkItemInCart){
            return res.json({
                message : 'Item already in cart',
                success : false
            })
        }

        const cartItem = new cartProductModel({
            quantity: 1,
            userId: userId,
            productId: productId
        })

        const save = await cartItem.save()

        const updateUserCart = await userModel.updateOne({_id:userId},{
            $push :{
                shopping_cart : productId
            }
        })

        return res.status(201).json({
            data: save,
            message : "Item added",
            success : true
        })
        
    } catch (error) {
        return res.status(501).json({
            message : error.message || error,
            success:false
        })
        
    }
}


exports.getCartItemController = async (req, res)=>{
    try {

        const userId = req.userId;

        const items = await cartProductModel.find({ userId: userId }).sort({ createdAt: -1 }).populate("productId");


        return res.status(201).json({
            message:'successfully fatch cart item',
            success: true,
            data:items
        })
        
    } catch (error) {

        return res.status(501).json({
            message:error.message,
            success: false
        })
        
    }
}


exports.removeCartProductController = async (req, res) => {
    try {
      const { _id } = req.params;
  
      const deleteProductData = await cartProductModel.deleteOne({ _id: _id });
  
      return res.json({
        message: "Item removed",
        success: true,
        data: deleteProductData,
      });
    } catch (error) {
      return res.status(501).json({
        message: error.message || message,
        success: false,
      });
    }
  };

    exports.updateCartProductController = async (req, res) => {
        try {
          const { _id } = req.params;
          const { quantity } = req.body;
      
          const updateProductData = await cartProductModel.updateOne(
            { _id: _id },
            {...(quantity && {quantity:quantity} ) });
      
          return res.json({
            message: "cart quantity updated",
            success: true,
            data: updateProductData,
          });
        } catch (error) {
          return res.status(501).json({
            message: error.message || message,
            success: false,
          });
        }
    }