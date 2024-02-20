const express = require("express");
const proRoute = express.Router();
const multer = require("multer");
const fs = require('fs'); 
const shortid=require('shortid')
const path =require('path')

const {addproduct} =require('../controllers/productcontroller')


//mutler configuration ..
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./prouploads"); // Uploads folder where files will be stored
    },
    filename: function (req, file, cb) {
      //cb(null, Date.now() + "-" + file.originalname); // file naming
     const iname=shortid()
     cb(null,iname+path.extname(file.originalname))
    },
  });


//upload file here...
const upload = multer({ storage: storage }); 




// ADD PRODUCT
proRoute.post('/addproduct' ,upload.single('pictures'),addproduct);





module.exports=proRoute;