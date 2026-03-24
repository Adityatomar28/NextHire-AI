//step 1 usermodel

const userModel = require("../models/user.model")
const authRouter = require("../routes/auth.routes")
const bcrypt = require("bcryptjs")

/**
 * 
 * @namer registerUserControllers
 * @description register a new user,expects username,email and password in the request body
 * @access. Public
 */

async function registerUserControllers(req,res) {
    const {username,email,password} = req.body

    if(!username || !email || !password){
        return res.status(400).json({
        message:"Please provide a username,email and password"
        })  
    }
    const isUserAlreadyExists = await userModel.findOne({
        //$-> can give multiple condition
        $or:[{username},{email}]
    })
    if(isUserAlreadyExists){
        return res.status(400).json({
        message:"Account already exists with this email address or username"
        })
    }
    //if user do not exist the create new user 
    //  first we hash the password then we registering the user 

}

module.exports = {
    registerUserControllers
}