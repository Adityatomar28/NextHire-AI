const pdfParse = require("pdf-parse/lib/pdf-parse.js");  // ✅ ONLY THIS
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */

async function generateInterViewReportController(req, res) {
    try {
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        const { jobDescription, selfDescription } = req.body;

        let resumeText = "";

        if (req.file) {
            const data = await pdfParse(req.file.buffer);  // ✅ use directly
            resumeText = data.text;
        }

        if (!resumeText && !selfDescription) {
            return res.status(400).json({
                message: "Provide resume or self description"
            });
        }

        const report = await generateInterviewReport({
            jobDescription,
            selfDescription,
            resumeText
        });

        // Ensure title is present
        if (!report.title) {
            report.title = jobDescription.split('\n')[0].substring(0, 100) || "Interview Report";
        }

        // Save the report to database
        const savedReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeText,
            selfDescription,
            jobDescription,
            ...report
        });

        res.json({
            interviewReport: savedReport
        });

    } catch (error) {
        console.error("🔥 ERROR:", error);
        res.status(500).json({ message: "Failed" });
    }
}

/**
 * @description Controller to get interview report by interviewId.
 */
async function getInterviewReportByIdController(req, res) {

    const { interviewId } = req.params

    const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully.",
        interviewReport
    })
}


/** 
 * @description Controller to get all interview reports of logged in user.
 */
async function getAllInterviewReportsController(req, res) {
    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
}


/**
 * @description Controller to generate resume PDF based on user self description, resume and job description.
 */
async function generateResumePdfController(req, res) {
    const { interviewReportId } = req.params

    const interviewReport = await interviewReportModel.findById(interviewReportId)

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    const { resume, jobDescription, selfDescription } = interviewReport

    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer)
}

module.exports = { generateInterViewReportController, getInterviewReportByIdController, getAllInterviewReportsController, generateResumePdfController }