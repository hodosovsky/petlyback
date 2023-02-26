const multer = require("multer");
const path = require("path");

const uploadDir = path.resolve("./tmp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 1048,
  },
});

const uploadMiddleware = multer({ storage });

module.exports = { uploadMiddleware };
