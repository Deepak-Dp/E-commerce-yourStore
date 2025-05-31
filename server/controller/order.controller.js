const orderModel = require("../models/order.models");
const userModel = require("../models/user.models");
const cartProductModel = require("../models/cartProduct.models");
const sendEmail = require("../config/sendEmail");
const orderConfirmMail = require("../utils/orderConfirmmail");

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

