/**
 * Multer is use to identify pdf 
 * pdf-parse is use to read the content of the pdf
 */

const multer = require("multer")

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 3 * 1024 * 1024 // 3MB
    }
})

module.exports = upload