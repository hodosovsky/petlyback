const { ValidationError } = require("../helpers/errors");
const fs = require("fs");

const validatinFileType = async (req, res, next) => {

    const { path: temporaryName } = req.file;
    const [, extension] = temporaryName?.split(".");

    if (
      extension.toLowerCase() !== "jpg" &&
      extension.toLowerCase() !== "png"
    ) {
    await fs.unlinkSync(temporaryName);
    next (new ValidationError("file must be '.jpg' or '.png'")) ;    
    }
    
    next();
  
};

module.exports = { validatinFileType };
