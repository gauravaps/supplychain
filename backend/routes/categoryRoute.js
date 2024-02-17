const express = require("express");
const catroute = express.Router();
const multer = require("multer");
const fs = require('fs'); 

const shortid=require('shortid')
const path =require('path')



//mutler configuration ..
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Uploads folder where files will be stored
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
const deleteFile = async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  const filePath = req.file.path; // Path to the uploaded file
  console.log("File path:", req.file.path);
  console.log(filePath);

  try {
     fs.unlinkSync(filePath); // fs.unlink ki jagah fs.promises.unlink ka upyog kiya gaya hai
    console.log("File deleted successfully");
    console.log("File path:", req.file.path);
    

  } catch (err) {
    console.error("Error deleting file:", err);
    fs.unlinkSync(filePath);
    

  }
  next(); // Move to the next middleware
};



//IMPORT ALL CONTROLLERS
const { addCategory ,getCategory ,deleteCategory} = require("../controllers/categoryController");


////Add cattegory product router!


//add category product
//http://localhost:5000/cat/addcategory
catroute.post("/addcategory", upload.single("pictures"),addCategory,deleteFile);



//get all category product
//http://localhost:5000/cat/getcategory
catroute.get("/getcategory",getCategory)

//DELETE category products
//http://localhost:5000/cat/deletecategory
catroute.delete('/deletecategory/:id',deleteCategory)




 

module.exports = catroute;
