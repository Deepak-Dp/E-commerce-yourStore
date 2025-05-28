const orderModel = require("../models/order.models");
const userModel = require("../models/user.models");
const cartProductModel = require("../models/cartProduct.models");
const sendEmail = require("../config/sendEmail");
const orderConfirmMail = require("../utils/orderConfirmmail");
const Stripe = require("../config/stripe");
require('dotenv').config()

exports.cashOnDeliveryController = async (req, res) => {
  try {
    const userId = req.userId;
    const { addressId, totalPrice, totalItemInCart, ProductDetails } = req.body;

    if (!addressId || !totalPrice || !totalItemInCart) {
      return res.json({
        message: "Provide all details",
        success: false,
      });
    }

    const userDetails = await userModel.findOne({ _id: userId });

    const orderData = {
      userId: userId,
      orderId: `ORD-${Math.random().toString(36).substr(2, 9)}`,
      product_details: ProductDetails.map((data) => {
        return {
          name: data.productId.name,
          image: data.productId.image[0],
          quantity: data.quantity,
          adminId: data.productId.userId,
          price: data.productId.price,
        };
      }),

      payment_status: "CASH ON DELIVERY",
      delivery_address: addressId,
      subTotalAmt: totalPrice,
      totalAmt: totalPrice,
      totalItem: totalItemInCart,
    };

    const order = new orderModel(orderData);
    const saveOrder = await order.save();

    if (saveOrder) {
      await cartProductModel.deleteMany({ userId: userId });
      await userModel.updateOne(
        { _id: userId },
        {
          $set: {
            shopping_cart: [],
          },
        }
      );
    }

    await sendEmail({
      sendTo: userDetails.email,
      subject: "Order Confirmation",
      html: orderConfirmMail({
        name: userDetails.name,
        payment_status: saveOrder.payment_status,
        orderId: saveOrder.orderId,
        totalAmt: saveOrder.totalAmt,
        order_status: saveOrder.order_status,
        createdAt: saveOrder.createdAt,
      }),
    });

    return res.status(201).json({
      data: saveOrder,
      message: "Order placed successfully",
      success: true,
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message || error,
      success: false,
    });
  }
};

exports.getUsersOrderController = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await orderModel
      .find({ userId: userId })
      .sort({ createdAt: -1 })
      .populate("delivery_address");

    return res.status(200).json({
      data: orders,
      message: "Orders fetched successfully",
      success: true,
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message || error,
      success: false,
    });
  }
};
exports.getAdminOrderController = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await orderModel
      .find({ "product_details.adminId": userId })
      .sort({ createdAt: -1 })
      .populate("delivery_address");

    return res.status(200).json({
      data: orders,
      message: "Orders fetched successfully",
      success: true,
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message || error,
      success: false,
    });
  }
};

exports.updateOrderStatusController = async (req, res) => {
  try {
    const { orderId, orderStatus } = req.body;

    if (!orderId || !orderStatus) {
      return res.json({
        message: "Provide all details",
        success: false,
      });
    }

    const updateOrder = await orderModel.updateOne(
      { orderId: orderId },
      {
        $set: {
          order_status: orderStatus,
        },
      }
    );

    if (updateOrder) {
      return res.status(201).json({
        message: "Order status updated successfully",
        success: true,
      });
    }
  } catch (error) {
    return res.status(501).json({
      message: error.message || error,
      success: false,
    });
  }
};

exports.onLinePaymentController = async (req, res) =>{

  try {

    const userId = req.userId;
    const { addressId, totalPrice, totalItemInCart, ProductDetails } = req.body;


    const userDetails = await userModel.findOne({ _id: userId });


    const line_items = ProductDetails.map (item=> {
      return {
          price_data : {
            currency: 'inr',
            product_data: {
              name: item.productId.name,
              image: item.productId.image[0],
              quantity: item.quantity,
              adminId: item.productId.userId,
              price: item.productId.price,
              metadata : {
                  productId : item.productId._id
              }
            },

            unit_amount :item.productId.price

          },

          adjustable_quantity : {
            enabled : true,
            minimum : 1
          },

          quantity : item.quantity
      }
    })

    const params = {
      submit_type : 'pay',
      mode : 'payment',
      payment_method_types: ['card'],
    customer_email : userDetails.email,
    metadata: {
      userId: userId,
      addressId : addressId,

    },

    line_items : line_items,
    success_url: `${process.env.FRONTEND_URL}/success`,
    cancel_url : `${process.env.FRONTEND_URL}/cancel`,

    }

    const session = await Stripe.checkout.sessions.create(params)

   return res.status(303).json(session)
    
  } catch (error) {
    return res.status(500).json({
      message : error.message || error,
      success : false
    })
    
  }
}

