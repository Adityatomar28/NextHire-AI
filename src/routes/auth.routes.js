const express = require('express')
const authControllers = require("../controllers/auth.controllers")

const authRouter = express.Router()

/**
 * @route POST/api/auth/register
 * @description Register a new user 
 * @access Public
 */


appRouter.post("/register",authControllers.registerUserControllers)

/**
 * @route POST/api/auth/login
 * @description login user with email and password
 * @access Public
 */
authRouter.post("/api/login",authControllers.loginUserControllers)



//isko likhne k baad app.js jaao or what kro
module.exports = authRouter