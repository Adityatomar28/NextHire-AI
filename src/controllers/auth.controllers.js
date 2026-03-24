//step 1 usermodel

const userModel = require("../models/user.model")
const authRouter = require("../routes/auth.routes")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const tokenBlackListModel = require("../models/blacklist.model")


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

    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        password:hash
    })
    //creating token for new user
    const token = jwt.sign(
        {id:user._id,username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )
    //setting these token in cokkies
    return res.status(201).json({
        message:"User register successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })


}

/**
 * 
 * @namer loginUserControllers
 * @description login a new user,expects username,email and password in the request body
 * @access. Public
 */

async function loginUserControllers(req,res){
    const {email,password} = req.body
    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }
    const isPasswordValid = await bcrypt.compare(password ,user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }
    const token = jwt.sign(
        {id:user._id,username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )
    res.cookie("token",token)
    res.status(200).json({
        message:"User loggedIn Successfully.",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })

}


async function logoutUserControllers(req,res){
    const token = req.cookies.token

    if(token){
        await tokenBlackListModel.create({token})
    }
    res.clearCookie("token")

    res.status(200).json({
        message:"User logged out successfully"
    })



}


/**
 * 
 * @namer getMeControllers
 * @description get the current logged in user details
 * @access. Private
 */
async function getMeController(req,res){
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message:"User details fetched successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}


module.exports = {
    registerUserControllers,
    loginUserControllers,
    logoutUserControllers,
    getMeController
}