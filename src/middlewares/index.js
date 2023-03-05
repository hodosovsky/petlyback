const { authMiddleware } = require("./authMiddleware");
const { validationBody } = require("./validationBody");
const { validatinFileType } = require("./validatinFileType");

module.exports = {
  authMiddleware,
  validationBody,
  validatinFileType,
};
