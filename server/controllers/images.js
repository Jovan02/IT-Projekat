const db = require("../db");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: "./public/images",
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage }).array("file");

const sendImage = (req, res) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({
                message: "A Multer error occurred when uploading.",
                error: err,
            });
        } else if (err) {
            return res.status(500).json({
                message: "An unknown error occurred when uploading.",
                error: err,
            });
        }
        return res.status(200).send(req.files[0]); // req.files[0]
    });
};

module.exports = { sendImage };
