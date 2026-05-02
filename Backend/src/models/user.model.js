const mongoose = require("mongoose")


//Creating schema

const userSchema = new mongoose.Schema({
    //properties
    username:{
        type:String,
        unique:[true,"username already taken"],
        required:true,
    },
    email:{
        type:String,
        unique:[true,"email already taken"],
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String
    },
    otpExpires: {
        type: Date
    }
})
//Here we are storing ki user k data kis collection[users] k andr store horha hoga ,and schema is userSchema
const userModel = mongoose.model("users",userSchema)
module.exports = userModel