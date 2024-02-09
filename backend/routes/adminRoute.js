const express=require('express')
const route=express.Router()

const {addAdmin,adminLogin} =require('../controllers/adminController')


//ADD ADMIN ROUTE..
//http://localhost:5000/api/addadmin
route.post('/addadmin',addAdmin)

//ADMIN LOGIN ..
//http://localhost:5000/api/adminlogin

route.post('/adminlogin',adminLogin)






module.exports=route;