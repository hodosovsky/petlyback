const express = require("express");

// const {} = require("../../controllers/notices");

const { schemas } = require("./../../db/noticesModel");

const {
  addContactsValidation,
  patchContactsValidation,
  patchFavoriteContactsValidation,
} = require("../../middlewares/middlewares");

const { authMiddleware } = require("../../middlewares/authMiddleware");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const router = express.Router();
router.use(authMiddleware);

// router.get("/", schemas.noticeValidateSchema, asyncWrapper());
// router.get("/:noticesId", asyncWrapper());

module.exports = router;
