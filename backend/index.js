const express=require('express')
const cors=require('cors')
const bodyparser=require('body-parser')
const db=require('./dataBaseConnection/dbconnection')
const route =require('./routes/adminRoute')
const catroute =require('./routes/categoryRoute')
const proRoute =require('./routes/productRoute')
const path =require('path')

//DOTENV FILE CONFIGURE
require('dotenv').config()
const app=express()
//use cors
const corsOptions = {
    origin: '*', // Allow all origins
    methods: '*', // Allow all methods
    allowedHeaders: '*' // Allow all headers
};

app.use(cors(corsOptions));



//use body-parser for json and URL incoded..
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
//app.use('/uploads', express.static('uploads'));



const port=process.env.PORT || 8000


// ADMIN-USER ROUTE..
app.use('/api',route) 

//CATEGORY ROUTE..
app.use('/cat',catroute)

//PRODUCT ROUTE
app.use('/pro',proRoute)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

 


app.listen(port,()=>{
    console.log(`express is running on port => ${port}`);   
})



