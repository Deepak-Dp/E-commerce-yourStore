const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    orderId: {
      type: String,
      required: [true, "Provide orderId"],
      unique: true,
    },
    productId: {
      type: mongoose.Schema.ObjectId,
      ref: "product",
    },
    product_details: [
      {
        adminId: {
            type:String
        },
        price:{
          type: String
        },
        name: {
          type: String,
        },
        image: {
          type: String,
        },
        quantity: {
          type: Number,
        },
      },
    ],

   
    paymentId: {
      type: String,
      default: "",
    },
    payment_status: {
      type: String,
      default: "",
    },
    delivery_address: {
      type: mongoose.Schema.ObjectId,
      ref: "address",
    },
    order_status: {
      type: String,
      default: "pending",
    },

    subTotalAmt: {
      type: Number,
      default: 0,
    },

    totalAmt: {
      type: Number,
      default: 0,
    },
    invoice_receipt: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;
