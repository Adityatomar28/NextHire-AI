//app.js k do hi kaam hai generally 

//1) server ka instant create krna 
const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")


//server 
const app = express()

//2)route create,using middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

// Require all the Routes here
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")

//using all the routes here
app.use("/api/auth",authRouter)
app.use("/api/interview",interviewRouter)


module.exports = app

