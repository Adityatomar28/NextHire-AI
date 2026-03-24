const jwt = require("jsonwebtoken") //verifying token
const tokenBlackListModel = require("../models/blacklist.model")


async function authUser(req,res,next){
    // Reading Token
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
        message:"Token not Provided."
        })
    }
    const isTokenBlacklisted = await tokenBlackListModel.findOne({
        token
    })
    if (isTokenBlacklisted){
        return res.status(401).json({
            message:"token is invalid"
        })
    }


    try {
        //jo bhi data hamne data token k andr s pdha hoga usko ham set krdete hai decoded
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()
    
    }catch (error) {
        return res.status(401).json({
            message:"Invalid token."
        })
    }
    
}

module.exports = {authUser}