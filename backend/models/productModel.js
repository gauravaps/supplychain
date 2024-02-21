const mongoose =require('mongoose')

const productSchems =new mongoose.Schema({

    procategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categoryPoduct',
        required:true

    },

    proname:{
        type:String,
        required:true
    },

    proshortdesc:{
        type:String,
        required:true
    },

    prolongdesc:{
        type:String,
        required:true
    },

    pictures:{
        type:String,
        required:true
    },
    proprice:{
        type:Number,
        require:true
    },

    prosellprice:{
        type:Number,
        required:true
    },
    prosaledate:{
        type:Date,
        required:true
    },

    prosaleend:{
        type:Date,
        required:true
    },

    prostatus:{
        type:String,
        enum:['pending','enable','disable'],
        default:'pending'
    },




},{timestamps:true})


const productDB = mongoose.model('productDB',productSchems);

module.exports=productDB; 