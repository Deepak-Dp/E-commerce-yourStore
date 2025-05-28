const addressmodel = require("../models/address.models");
const orderModel = require("../models/order.models");
exports.addAdressController = async (req, res) => {
  try {
    const userId = req.userId;
    const { address_line, city, state, pincode, country, mobile } = req.body;
    if (!address_line || !city || !state || !pincode || !country || !mobile) {
      return res.json({
        message: "fill all require fields",
        success: false,
      });
    }
    const address = new addressmodel({
      userId,
      address_line,
      city,
      state,
      pincode,
      country,
      mobile,
    });
    const saveAddress = await address.save();
    return res.status(200).json({
      success: true,
      data: saveAddress,
      message: "Address added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

exports.getAddressController = async (req, res) => {
  try {
    const userId = req.userId;
    const address = await addressmodel.find({ userId: userId });
    return res.status(200).json({
      success: true,
      data: address,
      message: "Address fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};



exports.deleteAddressController = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const checkProduct = await orderModel.find({
        delivery_address : {
                    "$in" :[ {_id: id } ]
                }
      }).countDocuments();


      if(checkProduct > 0 ){
            return res.status(400).json({
                message: "Address is already use can't delete",
                success : false
            })
        }
        
        

    const address = await addressmodel.findOneAndDelete({
      _id: id,
      userId: userId,
    });
    return res.status(200).json({
      success: true,
      data: address,
      message: "Address deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};

exports.EditAdressController = async (req, res) => {
  try {
    const { id, address_line, city, state, pincode, country, mobile } =
      req.body;

    if (!address_line || !city || !state || !pincode || !country || !mobile) {
      return res.json({
        message: "fill all require fields",
        success: false,
      });
    }
    const address = await addressmodel.findOneAndUpdate(
      { _id: id },
      {
        ...(address_line && { address_line: address_line }),
        ...(city && { city: city }),
        ...(state && { state: state }),
        ...(pincode && { pincode: pincode }),
        ...(country && { country: country }),
        ...(mobile && { mobile: mobile }),
      }
    );
    return res.status(200).json({
      success: true,
      data: address,
      message: "Address updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || error,
    });
  }
};
