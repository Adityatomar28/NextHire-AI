const pdfParse = require("pdf-parse")
const generateInterviewReport = require("../Services/ai.services")
const interviewReportModel = require("../models/interviewReport.model")

async function generateInterviewReportController(req, res) {
    try {
        //parse PDF properly
        const pdfData = await (new pdfParse.PDFParse(Uint8Array(req.file.buffer))).getText()
        const resumeContent = pdfData.text

        const { selfDescription, jobDescription } = req.body

     
        const interviewReportByAi = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription
        })

        //save full AI response
        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume:resumeContent.text,
            selfDescription,
            ...interviewReportByAi

        })

        //send response
        res.status(201).json({
            success: true,
            data: interviewReport
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

module.exports = { generateInterviewReportController }