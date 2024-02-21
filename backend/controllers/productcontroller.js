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

// GET all products ..

const getAllProducts =async(req,res)=>{

    try {
        const showAllProducts =await productDB.find().populate('procategory')
        const proNames = showAllProducts.map(product =>(product.proname,product.prolongdesc)); // Sabhi products ke proname ko ek array mein collect karna

        console.log(proNames);

        if (!showAllProducts) {
            res.status(400).json({'sts':1,message:'No products found'})
            
        } else {
            const prodata =showAllProducts.map((products)=>({pictures:products.pictures,
                proname:products.proname,
                proprice:products.proprice,
                procategory:products.procategory.producttype,
                prostatus:products.prostatus

                
            }))
            console.log(prodata);
            
            res.status(200).json({'sts':0,message:'this is your all products',
            'allpro':showAllProducts ,'prodata':prodata,
        })
            
        }
        
    } catch (error) {
        res.status(500).json({'sts0':2,message:'not fount any product something error','error':error})
    }
}



module.exports={addproduct,getAllProducts}