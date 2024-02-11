require('dotenv').config
const adminuser=require('../models/adminUser')
const tokens=require('../models/token')
const bcrypt = require("bcryptjs");
const jwt =require('jsonwebtoken')





//ADMIN REGISTRATION controller..

const addAdmin = async (req, res) => {
    try {
        // Extracting data from request body
        const { fullname, email, password } = req.body;

        // Check if any field is empty...
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        // Check if user already exists..
        const userExist = await adminuser.findOne({ email });
        if (userExist) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creating a new admin user
        const newAdminUser = new adminuser({
            fullname,
            email,
            password: hashedPassword
        });

        // Saving the new admin user to the database
        const savedUser = await newAdminUser.save();

        // Sending success response
        res.status(201).json({ message: "User created successfully", user: savedUser });
    } catch (error) {
        // Handling errors
        console.error("Error in registration:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

//ADdmin login controller

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user not found
        const user = await adminuser.findOne({ email });
        if (!user) {
            return res.status(404).json({'sts':1, message: "User not registered, please enter a valid email id" });
        }

        // Password comparison
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({'sts':2, message: "Password does not match" });
        }

        // Create and save token
        const token = jwt.sign({ email: user.email }, process.env.SECRET_TOKEN, { expiresIn:'5hr'});

        const expiresAt = new Date(Date.now() + (5 * 60 * 60 * 1000)); // 5 hours expiry

        const saveToken = new tokens({
            userid: user._id,
            token: token,
            expiresAt: expiresAt
        });

        await saveToken.save();

        // Sending success response
        return res.status(200).json({'sts':0,'adminid':user._id, 'fname': user.fullname, message: "User login successful", 'token': token });

    } catch (error) {
        console.error('Error in login:', error);
        return res.status(500).json({'sts':3, message: 'Internal server error' });
    }
};


//CHECK ADMIN TOKENS
const checkToken=async(req,res)=>{
    try {
        const token=req.body.token;

        const getToken=await tokens.findOne({token})
        if(!getToken){

         return   res.status(500).json({'sts':1,message:'Token not found'})

        }else{

         return   res.status(200).json({'sts':0,message:'token got successfully'})
        }
        
    } catch (error) {
        res.status(500).json({'sts':2,message:'something server error'})
    }
}

//CHANGE PASSWORD USING OLD PASSWORD

const changeAdmintPassword=async(req,res)=>{

    try {
        const {oldpassword,password}=req.body;
        
     const {id} =req.params;

     //FIND USER BY ID!
        const getUser = await adminuser.findById(id)

        //if user not found
        if(!getUser){
          return  res.status(404).json({'sts':1,message:'admin user not found ,please enter valid email'})
        }

        //VERIFY OLD PASSWORD!!
        const checkOldpassword=await bcrypt.compare(oldpassword,getUser.password)

        
        //CHECK OLD PASSWORD IS  VERYFIED OR NOT!!
        if(!checkOldpassword){
          return  res.status(400).json({'sts':2,message:'Old password does not match'})
        }

        // HASHING  NEW PASSWORD !!!
        const hashNewPassword=await bcrypt.hash(password,10)
        

         //PASSWORD HASHED WITH NEW PASSWORD
        const changepassword =await adminuser.findByIdAndUpdate(id,{password:hashNewPassword},{new:true})

        res.status(200).json({ 'sts':0,message: 'Password updated successfully', user:changepassword})



        
    } catch (error) {
        res.status(500).json({message:'Something went wrong', error: error.message})

        
    }
}




module.exports = { addAdmin,adminLogin,checkToken ,changeAdmintPassword};





