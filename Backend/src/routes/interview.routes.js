const express = require("express")
const authMiddleware = require("../middleware/auth.middleware")
const interviewController = require("../controllers/interview.controllers")
const upload = require("../middleware/file.middleware")


const interviewRouter = express.Router()

//api call
/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of user self description,resume pdf and job description.
 * @access private
 *  As access is pvt therefore we have to use middleware
 */
interviewRouter.post("/",authMiddleware.authUser,upload.single("resume"),interviewController.generateInterviewReportController)

module.exports = interviewRouter