const express=require('express')
const route=express.Router()

const {addAdmin,adminLogin,checkToken,
    changeAdmintPassword,emailverificationLink,
     adminnewpassreset} =require('../controllers/adminController')


//ADD ADMIN ROUTE..
//http://localhost:5000/api/addadmin

route.post('/addadmin',addAdmin)

//ADMIN LOGIN ..
//http://localhost:5000/api/adminlogin

route.post('/adminlogin',adminLogin)

//ADMIN CHECK TOKEN
//http://localhost:5000/api/tokencheck

route.post('/tokencheck',checkToken)

//CHANGE CURRENT ADMIN PASSWORD
//http://localhost:5000/api/adminpass

route.patch('/changepass/:id',changeAdmintPassword)

//SEND ADMIN PASSWORD RESET LINK
//http://localhost:5000/api/adminpassreset

route.post('/adminpassreset',emailverificationLink)

//admin set new password
//http://localhost:5000/api/adminnewpass

route.post('/adminnewpass',adminnewpassreset)
//route.post('/adminnewpass/:resetToken', adminnewpassreset);















module.exports=route;