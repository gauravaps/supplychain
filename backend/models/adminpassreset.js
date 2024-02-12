const mongoose=require('mongoose')

const adminpassSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    resetToken:{
        type:String,
        required:true
    },
    expiresAt:{
        type:Date,
        required:true
    }
})

adminpassSchema.index({expiresAt:1},{expireAfterSeconds:0})

const adminpassreset=mongoose.model('adminpassreset',adminpassSchema)

module.exports=adminpassreset;