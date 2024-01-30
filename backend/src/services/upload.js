/* const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "../images"));
  },
  filename: (req, file, cb) => {
    const DateOfCreation = Date.now();
    const arrayFile = file.originalname.replaceAll(" ", "_").split(".");
    const extendValue = arrayFile.pop();

    cb(null, `${arrayFile}_${DateOfCreation}.${extendValue}`);
  },
});

module.exports = multer({ storage }).single("file"); */
