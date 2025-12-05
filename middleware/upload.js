

const multer = require("multer");
const path = require("path");

const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = "./uploads/photos/images";
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

module.exports = upload;