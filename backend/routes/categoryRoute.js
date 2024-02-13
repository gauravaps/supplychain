const express = require("express");
const catroute = express.Router();
const multer = require("multer");

//mutler configuration ..
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Uploads folder where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // file naming
  },
});


//upload file here...
const upload = multer({ storage: storage });

//IMPORT ALL CONTROLLERS
const { addCategory } = require("../controllers/categoryController");


////Add cattegory product router!

catroute.post("/addcategory", upload.single("pictures"), addCategory);





module.exports = catroute;
