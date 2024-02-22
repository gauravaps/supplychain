const express = require("express");
const proRoute = express.Router();
const multer = require("multer");
const fs = require('fs'); 
const shortid=require('shortid')
const path =require('path')

const {addproduct ,getAllProducts,changeProductStatus} =require('../controllers/productcontroller')


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
//http://localhost:5000/pro/addproduct
proRoute.post('/addproduct' ,upload.single('pictures'),addproduct);


//GEt all products
//http://localhost:5000/pro/getproduct
proRoute.get('/getproduct',getAllProducts)

//change multiple  products status
//http://localhost:5000/pro/changemany
proRoute.put('/changemany' ,changeProductStatus)






module.exports=proRoute;