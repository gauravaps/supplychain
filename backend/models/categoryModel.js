const mongoose=require('mongoose')

const productcategorschema=new mongoose.Schema({
    productname:{
        type:String,
        required:true
    },
    pictures:{
        type:String,
        required:true
    },
},{timestamps:true})

const categoryProduct=mongoose.model('categoryPoduct',productcategorschema)

module.exports=categoryProduct;