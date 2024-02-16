const express = require("express");
const catroute = express.Router();
const multer = require("multer");
const fs = require('fs')
const shortid=require('shortid')
const path =require('path')



//mutler configuration ..
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/"); // Uploads folder where files will be stored
  },
  filename: function (req, file, cb) {
    //cb(null, Date.now() + "-" + file.originalname); // file naming
   const iname=shortid()
   cb(null,iname+path.extname(file.originalname))
  },
});


//upload file here...
const upload = multer({ storage: storage });


// Middleware to delete file after upload
const deleteFile = (req, res, next) => {
  if (!req.file) {
    return next();
  }
  const filePath = req.file.path; // Path to the uploaded file
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
    }
  });
  next(); // Move to the next middleware
};


//IMPORT ALL CONTROLLERS
const { addCategory ,getCategory} = require("../controllers/categoryController");


////Add cattegory product router!


//add category product
//http://localhost:5000/cat/addcategory
catroute.post("/addcategory", upload.single("pictures"), addCategory,deleteFile);

//get all category product
//http://localhost:5000/cat/getcategory
catroute.get("/getcategory",getCategory)



 

module.exports = catroute;
