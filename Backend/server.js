
require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/database")
const {resume,selfDescription,jobDescription} = require("./src/Services/temp")
const generateInterviewReport = require("./src/Services/ai.services")
connectToDB()


generateInterviewReport({resume,selfDescription,jobDescription})

app.listen(3000,()=>{
    console.log("Serve is running on the port 3000")
})
