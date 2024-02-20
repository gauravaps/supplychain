const shortid = require("shortid");
const productDB =require('../models/productModel')


//ADD PRODUCT..
const addproduct= async(req,res)=>{

    try {
        const {procategory,proname,proshortdesc,prolongdesc,proprice,prosellprice,prosaledate,prosaleend} =req.body;

        const pictures = req.file.filename;


        const addproduct =new productDB({procategory,proname,
            proshortdesc,prolongdesc,
            proprice,prosellprice,
            prosaledate,prosaleend,pictures
        })

        //save product in data base ...
        const saveProduct =addproduct.save()

        res.status(200).json({'sts':0 ,message:'product addedd successfully','Newproduts':saveProduct})


        
    } catch (error) {

        res.status(500).json({'sts':2,message:'product added failed'})
        console.log(error);
        
    }
}



module.exports={addproduct}