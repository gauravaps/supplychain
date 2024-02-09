const express=require('express')
const cors=require('cors')
const bodyparser=require('body-parser')
const db=require('./dataBaseConnection/dbconnection')
const route =require('./routes/adminRoute')

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

const port=process.env.PORT || 8000


// ADMIN-USER ROUTE..
app.use('/api',route) 
 


app.listen(port,()=>{
    console.log(`express is running on port => ${port}`);   
})



