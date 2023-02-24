const express = require("express");

// const {} = require("../../controllers/notices");

const { getUserFavorites } = require("../../controllers/notices/getUserFavorites");
const { addToFavoriteNotice } = require("../../controllers/notices/addToFavoriteNotice");

const { schemas } = require("./../../db/noticesModel");

const {
  addContactsValidation,
  patchContactsValidation,
  patchFavoriteContactsValidation,
} = require("../../middlewares/middlewares");

const { authMiddleware } = require("../../middlewares/authMiddleware");
const { isValidId } = require("../../middlewares/isValidId");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const router = express.Router();
router.use(authMiddleware);

// router.get("/", schemas.noticeValidateSchema, asyncWrapper());
// router.get("/:noticesId", asyncWrapper());


// favoriteNotices
router.get("/favorite", authMiddleware, asyncWrapper(getUserFavorites));
router.post(
  "/favorite/:noticeId",
  authMiddleware,
  isValidId,
  asyncWrapper(addToFavoriteNotice)
);


module.exports = router;
