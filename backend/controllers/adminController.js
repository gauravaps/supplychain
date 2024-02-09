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
            return res.status(400).json({ msg: 'Please enter all fields' });
        }

        // Check if user already exists..
        const userExist = await adminuser.findOne({ email });
        if (userExist) {
            return res.status(409).json({ msg: 'User already exists' });
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
            return res.status(404).json({ msg: "User not registered, please enter a valid email id" });
        }

        // Password comparison
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ msg: "Password does not match" });
        }

        // Create and save token
        const token = jwt.sign({ email: user.email }, process.env.SECRET_TOKEN, { expiresIn:'1hr'});

        const expiresAt = new Date(Date.now() + (5 * 60 * 60 * 1000)); // 5 hours expiry

        const saveToken = new tokens({
            userid: user._id,
            token: token,
            expiresAt: expiresAt
        });

        await saveToken.save();

        // Sending success response
        return res.status(200).json({ 'fname': user.fullname, msg: "User login successful", 'token': token });

    } catch (error) {
        console.error('Error in login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { addAdmin,adminLogin, };






module.exports={addAdmin,adminLogin}