const mongoose=require('mongoose')

const productcategorschema=new mongoose.Schema({
    productname:{
        type:String,
        required:true
    },
    producttype:{
        type:String,
        required:true
    },
    pictures:{
        type:String,
        
    },

},{timestamps:true})

const categoryProduct=mongoose.model('categoryPoduct',productcategorschema)

module.exports=categoryProduct; 