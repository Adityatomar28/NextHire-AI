const express = require('express')
const authControllers = require("../controllers/auth.controllers")
const authMiddleware =  require("../middleware/auth.middleware")

const authRouter = express.Router()

/**
 * @route POST/api/auth/register
 * @description Register a new user 
 * @access Public
 */


authRouter.post("/register",authControllers.registerUserControllers)

/**
 * @route POST/api/auth/login
 * @description login user with email and password
 * @access Public
 */
authRouter.post("/login",authControllers.loginUserControllers)

/**
 * @route GET/api/auth/logout
 * @description clear cookie from user cookie and add token in blacklist
 * @access Public
 */

authRouter.get("/logout",authControllers.loginUserControllers)


/**
 * @route GET/api/auth/get-me
* @descriptions get the current logged in user details
* @access private
*/
// Here middle-ware is also coming that let us know which user has requested 
authRouter.get("/get-me",authMiddleware.authUser,authControllers.getMeController)



//The router is then exported and used in app.js with a base path
module.exports = authRouter

