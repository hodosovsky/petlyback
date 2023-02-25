const { ValidationError } = require("../helpers/errors");
const fs = require("fs");

const validatinFileType = async (req, res, next) => {
  try {
    if (!req) next(new ValidationError("transfer file, please'"));
    const { path: temporaryName } = req.file;

    const [, extension] = temporaryName?.split(".");

    if (
      extension.toLowerCase() !== "jpg" &&
      extension.toLowerCase() !== "png"
    ) {
      await fs.unlinkSync(temporaryName);
      next(new ValidationError("file must be '.jpg' or '.png'"));
    }

    next();
  } catch (error) {
    next(new ValidationError("file must be '.jpg' or '.png"));
  }
};

module.exports = { validatinFileType };
