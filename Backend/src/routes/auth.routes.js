const express = require('express')
const authControllers = require("../controllers/auth.controllers")
const authMiddleware = require("../middleware/auth.middleware")

const authRouter = express.Router()

/**
 * @route POST /api/auth/register
 * @description Register a new user 
 * @access Public
 */
authRouter.post("/register", authControllers.registerUserController)

/**
 * @route POST /api/auth/login
 * @description Login user with email and password
 * @access Public
 */
authRouter.post("/login", authControllers.loginUserController)


/**
 * @route GET /api/auth/logout
 * @description Logout user and clear cookie
 * @access Public
 */
authRouter.get("/logout", authControllers.logoutUserController)

/**
 * @route GET /api/auth/get-me
 * @description Get current logged-in user details
 * @access Private
 */
authRouter.get("/get-me", authMiddleware.authUser, authControllers.getMeController)

module.exports = authRouter