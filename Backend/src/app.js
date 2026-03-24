//app.js k do hi kaam hai generally 

//1) server ka instant create krna 
const express = require("express")
const cookieParser = require("cookie-parser")

//server 
const app = express()

//2)route create,using middleware
app.use(express.json())
app.use(cookieParser())

// Require all the Routes here
const authRouter = require("./routes/auth.routes")
//using all the routes here
app.use("/api/auth",authRouter)


module.exports = app

