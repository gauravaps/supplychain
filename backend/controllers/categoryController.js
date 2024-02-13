const categoryProduct=require('../models/categoryModel')
const adminuser=require('../models/adminUser')
const tokens=require('../models/token')
const adminpassResetmodel=require('../models/adminpassreset')
const shortid=require('shortid')

// ADD PRODUCT CATEGORY
const addCategory = async (req, res) => {
    try {
        // Extract productname and pictures from request body
        const { productname } = req.body;
        const pictures = req.file.path;

        // Check if productname or pictures are missing
        if (!productname || !pictures) {
            return res.status(400).json({ message: "All fields are required, please fill" });
        }

        // Create a new categoryProduct object with productname and pictures
        const addproduct = new categoryProduct({ productname: productname, pictures: pictures });

        // Save the new product
        const saveProduct = await addproduct.save();

        // Return success response with the saved product
        res.status(200).json({ message: "Product successfully added", 'product': saveProduct });
    } catch (error) {
        // Return error response if any error occurs
        res.status(500).json({ message: 'Add product category failed', 'error': error });
    }
}







module.exports={addCategory}

