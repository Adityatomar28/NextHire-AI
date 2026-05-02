const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")
const { generateOTP, sendOTPEmail } = require("../services/email.service")


/**
 * @name registerUserController
 * @description register a new user, expects username, email and password in the request body
 * @access Public
 */
async function registerUserController(req, res) {

    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide username, email and password"
        })
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [ { username }, { email } ]
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "Account already exists with this email address or username"
        })
    }

    const hash = await bcrypt.hash(password, 10)
    const otp = generateOTP()
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    const user = await userModel.create({
        username,
        email,
        password: hash,
        otp,
        otpExpires
    })

    // Send OTP email
    const emailSent = await sendOTPEmail(email, otp)

    if (!emailSent) {
        // If email fails, delete the user and return error
        await userModel.findByIdAndDelete(user._id)
        return res.status(500).json({
            message: "Failed to send verification email. Please try again."
        })
    }

    res.status(201).json({
        message: "Registration successful! Please check your email for verification code.",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}

/**
 * @name verifyOTPController
 * @description verify OTP and activate user account
 * @access Public
 */
async function verifyOTPController(req, res) {
    const { email, otp } = req.body

    if (!email || !otp) {
        return res.status(400).json({
            message: "Please provide email and OTP"
        })
    }

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).json({
            message: "User not found"
        })
    }

    if (user.isVerified) {
        return res.status(400).json({
            message: "Account already verified"
        })
    }

    if (!user.otp || !user.otpExpires) {
        return res.status(400).json({
            message: "No OTP found. Please register again."
        })
    }

    if (user.otp !== otp) {
        return res.status(400).json({
            message: "Invalid OTP"
        })
    }

    if (user.otpExpires < new Date()) {
        return res.status(400).json({
            message: "OTP has expired. Please request a new one."
        })
    }

    // Verify the user
    user.isVerified = true
    user.otp = undefined
    user.otpExpires = undefined
    await user.save()

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000
    }

    res.cookie("token", token, cookieOptions)
    res.status(200).json({
        message: "Email verified successfully! You are now logged in.",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

/**
 * @name loginUserController
 * @description login a user, expects email and password in the request body
 * @access Public
 */
async function loginUserController(req, res) {

    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    // Temporary: Allow login without verification for testing
    // if (!user.isVerified) {
    //     return res.status(400).json({
    //         message: "Please verify your email first. Check your email for the verification code."
    //     })
    // }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    )

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000
    }

    res.cookie("token", token, cookieOptions)
    res.status(200).json({
        message: "User loggedIn successfully.",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}


/**
 * @name logoutUserController
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */
async function logoutUserController(req, res) {
    const token = req.cookies.token

    if (token) {
        await tokenBlacklistModel.create({ token })
    }

    res.clearCookie("token")

    res.status(200).json({
        message: "User logged out successfully"
    })
}

/**
 * @name getMeController
 * @description get the current logged in user details.
 * @access private
 */
async function getMeController(req, res) {

    const user = await userModel.findById(req.user.id)



    res.status(200).json({
        message: "User details fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}



module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController,
    verifyOTPController
}