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
        

        if (!showAllProducts) {
            res.status(400).json({'sts':1,message:'No products found'})
            
        } else {
            const prodata =showAllProducts.map((products)=>({pictures:products.pictures,
                _id:products._id,
                proname:products.proname,
                proprice:products.proprice,
                procategory:products.procategory.producttype,
                prostatus:products.prostatus
                

                
            }))
            

            res.status(200).json({'sts':0,message:'this is your all products',
            'allpro':showAllProducts ,'prodata':prodata,
        })
            
        }
        
    } catch (error) {
        res.status(500).json({'sts0':2,message:'not fount any product something error','error':error})
    }
} 
 
//CHANGE PRODUCTS  status.

const changeProductStatus =async(req,res) =>{
    const { productids, newstatus } = req.body;

    try {
        const result = await productDB.updateMany({_id:{$in:productids}},{prostatus:newstatus})

        if (!result) {
          return  res.status(400).json({'sts':1,message:'status change failed by IDS'})
            
        } else {
          return  res.status(200).json({'sts':0,message:'Multiple products updated successfully','result': result})
            
        }
        
    } catch (error) {
        console.error('Error updating multiple products:', error);
        return res.status(500).json({ message: 'Internal server error' });
        
    }
}



module.exports={addproduct,getAllProducts ,changeProductStatus}