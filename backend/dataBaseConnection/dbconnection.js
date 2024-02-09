const mongoose=require('mongoose')

// require DOTENV config
require("dotenv").config();
const DB_URL = process.env.DB_URL;

try {
  mongoose
    .connect(`${DB_URL}`)
    .then(() => console.log(" mongoDB Connected successfully...!"));
} catch (error) {
  console.error("connection failed ", error.message);
}
module.exports = mongoose;