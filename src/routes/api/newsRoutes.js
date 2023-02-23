const express = require("express");

const  getAllNews = require("../../controllers/news/getAllNews");
const { asyncWrapper } = require("../../helpers/apiHelpers");

const router = express.Router();

router.get("/", asyncWrapper(getAllNews));

module.exports = router;