const {authMiddleware} = require("./authMiddleware");
// const {googleAuth} = require('./googleAuth');
const {validationBody} = require("./validationBody")
const {validatinFileType} = require("./validatinFileType");

module.exports = {
    authMiddleware,
    validationBody,
    validatinFileType
}
