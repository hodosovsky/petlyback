const express = require("express");
const { asyncWrapper } = require("../../helpers/apiHelpers");

const router = express.Router();

router.get("/", asyncWrapper());

module.exports = router;
