const mongoose=require('mongoose')

const tokenSchema=new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'adminuser',
        required:true,
    },

    token:{
        type:String,
        required:true
    },
    expiresAt:{
        type:Date,
        required:true
    },
    
},{timestamps:true})

tokenSchema.index({expiresAt:1},{expireAfterSeconds:0});

const tokens=mongoose.model('token',tokenSchema)

module.exports=tokens;