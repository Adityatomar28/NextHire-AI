//app.js k do hi kaam hai generally 


//1) server ka instant create krna 
const express = require("express")

//server 
const app = express()

//2)route create,using middleware
app.use(express.json())


module.exports = app