const express = require("express");

const { addNoticeController } = require("../../controllers/notices");

const {
  getNoticesByCategoryController,
} = require("../../controllers/notices/getNoticesByCategory");
const {
  getAllCategoriesController,
} = require("../../controllers/notices/getAllCategories");

const { getUserFavorites } = require("../../controllers/notices/getUserFavorites");
const { addToFavoriteNotice } = require("../../controllers/notices/addToFavoriteNotice");

const { schemas } = require("./../../db/noticesModel");

const {
  addContactsValidation,
  patchContactsValidation,
  patchFavoriteContactsValidation,
} = require("../../middlewares/middlewares");


const { isValidId } = require("../../middlewares/isValidId");
const {
  authMiddleware,
  validationBody,
  validatinFileType,
} = require("../../middlewares/index");
const { uploadMiddleware } = require("../../helpers/multerConfig");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const router = express.Router();
// router.use(authMiddleware)

router.get(
  "/",
  // schemas.noticeValidateSchema,
  asyncWrapper(getAllCategoriesController)
);
router.get("/:noticesId", asyncWrapper(getNoticesByCategoryController));

router.post(
  "/",
  authMiddleware,
  uploadMiddleware.single("avatar"),
  validatinFileType,
  validationBody(schemas.noticeAddValidateSchema),
  asyncWrapper(addNoticeController)
);


// favoriteNotices
router.get("/favorite", authMiddleware, asyncWrapper(getUserFavorites));
router.post(
  "/favorite/:noticeId",
  authMiddleware,
  isValidId,
  asyncWrapper(addToFavoriteNotice)
);


module.exports = router;
