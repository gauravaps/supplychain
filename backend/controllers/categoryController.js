const categoryProduct = require("../models/categoryModel");
const adminuser = require("../models/adminUser");
const tokens = require("../models/token");
const adminpassResetmodel = require("../models/adminpassreset");
const shortid = require("shortid");
const fs = require("fs");
const path = require("path");

// ADD PRODUCT CATEGORY
const addCategory = async (req, res) => {
  try {
    // Extract productname and pictures from request body
    const { productname, producttype } = req.body;
    const pictures = req.file.filename;
    console.log("req.file:", pictures);
    console.log(req.file.path);

    // Check if productname or pictures are missing
    if (!productname || !producttype ) {
      return res
        .status(400)
        .json({ sts: 1, message: "All fields are required, please fill" });
    }

    // Create a new categoryProduct object with productname and pictures
    const addproduct = new categoryProduct({
      productname: productname,
      producttype: producttype,
      pictures: pictures,
    });

    // Save the new product
    const saveProduct = await addproduct.save();

    // Return success response with the saved product
    return res
      .status(200)
      .json({
        sts: 0,
        message: "Product successfully added",
        product: saveProduct,
      });
  } catch (error) {
    // Return error response if any error occurs
    return res
      .status(500)
      .json({ sts: 2, message: "Add product category failed", error: error });
  }
};

//GET ALL CATEGORY PRODUCT

const getCategory = async (req, res) => {
  try {
    const getData = await categoryProduct.find();

    //if no user found
    if (!getData) {
      res.status(400).json({ sts: 1, message: "No user found" });
    } else {
      res
        .status(200)
        .json({
          sts: 0,
          message: "getting users successfully",
          users: getData,
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({ sts: 2, message: "something in server  error", error: error });
  }
};

//DELETECategory Products

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params; // get IDA FROM PARAMS

    const productId = await categoryProduct.findByIdAndDelete(id);

    if (!productId) {
      return res.status(400).json({ sts: 1, message: "No product found" });

    } else {

      //unlink images from uploads folder
      fs.unlinkSync(`./uploads/${productId.pictures}`);

         return res
        .status(200)
        .json({ sts: 0, message: "product successfully deleted" });
    }
  } catch (error) {
         res
      .status(500)
      .json({ sts: 2, message: "product deleted failed", error: error });
  }
};

module.exports = { addCategory, getCategory, deleteCategory };
