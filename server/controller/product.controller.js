const productModel = require("../models/product.models");

exports.addProductController = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      name,
      image,
      category,
      unit,
      stock,
      brand,
      color,
      price,
      discount,
      description,
      more_details,
    } = req.body;

    if (!name ||!image[0]  ||!category[0] ||!unit ||!stock ||!price || !description ||!discount  ) {
      return res.json({
        message: "fill all require fields",
        success: false,
      });
    }

    const newProduct = new productModel({
      userId,
      name,
      image,
      category,
      unit,
      stock,
      brand,
      color,
      price,
      discount,
      description,
      more_details,
    });

    const saveProduct = await newProduct.save();

    return res.status(201).json({
      message: "Product Created Successfully",
      data: saveProduct,
      success: true,
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message || error,
      success: false,
    });
  }
};

exports.getAdminProductsController = async (req, res) => {
  try {
    const userId = req.userId;

    const data = await productModel.find({ userId: userId }).sort({ createdAt: -1 }).populate("category");

    return res.status(201).json({
      message: "Successfully Fatch Admin Products ",
      success: true,
      data: data,
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message || error,
      success: false,
    });
  }
};

exports.removeProductController = async (req, res) => {
  try {
    const { _id } = req.params;

    const deleteProductData = await productModel.deleteOne({ _id: _id });

    return res.json({
      message: "Product Deleted Successfully",
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

exports.updateProductDateController = async (req, res) => {
  try {
    const { _id, unit, stock, price, discount,brand,color } = req.body;

    const product = await productModel.updateOne(
      { _id: _id },
      {
        ...(unit && { unit: unit }),
        ...(stock && { stock: stock }),
        ...(price && { price: price }),
        ...(discount && { discount: discount }),
        ...(brand && { brand: brand }),
        ...(color && { color: color }),
      }
    );

    return res.status(201).json({
      message: "Product Update Successfully",
      success: true,
      data: product,
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message || error,
      success: false,
    });
  }
};

exports.getAllProductController = async (req, res) => {
  try {
    const products = await productModel
      .find()
      .sort({ createdAt: -1 })
      .populate("category");

    return res.status(201).json({
      message: "successfully fatch all products",
      success: true,
      data: products,
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message || error,
      success: false,
    });
  }
};

exports.getProductsDetailsController = async (req, res) => {
  try {
    const { _id } = req.params;

    const product = await productModel.findOne({ _id });

    return res.status(200).json({
      data: product,
      message: "successfully fatch data",
      success: true,
    });
  } catch (error) {
    return res.status(501).json({
      message: error.message || error,
      succes: false,
    });
  }
};
