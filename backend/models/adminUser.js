const mongoose=require('mongoose')

const adminschema=new mongoose.Schema({

    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate: {
            validator: (email) => {
                // Regular expression for email validation
                return /^[a-zA-Z]+[a-zA-Z0-9._%+-]*@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/.test(email);
            },
            message: error => `${error.value} is not a valid email address`
        }
    },
        
      
    password:{
        type:String,
        required:true
    },



},{timestamps:true})

const adminuser=mongoose.model('adminuser',adminschema)

module.exports=adminuser;