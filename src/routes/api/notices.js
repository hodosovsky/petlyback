const express = require("express");
const { addNoticeController } = require("../../controllers/notices");
const {
  getNoticesByCategoryController,
} = require("../../controllers/notices/getNoticesByCategory");
const {
  getAllCategoriesController,
} = require("../../controllers/notices/getAllCategories");
const {
  getUserFavorites,
} = require("../../controllers/notices/getUserFavorites");
const {
  addToFavoriteNotice,
} = require("../../controllers/notices/addToFavoriteNotice");
const { schemas } = require("./../../db/noticesModel");
const { isValidId } = require("../../middlewares/isValidId");
const {
  authMiddleware,
  validationBody,
  validatinFileType,
} = require("../../middlewares/index");
const { uploadMiddleware } = require("../../helpers/multerConfig");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const {
  getNoticesByUserController,
} = require("../../controllers/notices/getNoticesByUser");
const {
  deleteNoticeController,
} = require("../../controllers/notices/removeUserNotice");
const {
  patchNoticeController,
} = require("../../controllers/notices/patchNotice");
const {
  patchNoticeAvatarController,
} = require("../../controllers/notices/patchNoticeAvatar");

const router = express.Router();

// Get User notices
router.get("/my", authMiddleware, asyncWrapper(getNoticesByUserController));
// Delete User notices
router.delete(
  "/:noticeId",
  authMiddleware,
  asyncWrapper(deleteNoticeController)
);
// favoriteNotices
router.get("/favorite", authMiddleware, asyncWrapper(getUserFavorites));
router.patch(
  "/favorite/:noticeId",
  authMiddleware,
  isValidId,
  asyncWrapper(addToFavoriteNotice)
);
// Patch Notice
router.patch(
  "/:noticesId",
  authMiddleware,
  validationBody(schemas.noticeAddValidateSchema),
  asyncWrapper(patchNoticeController)
);
// Patch Notice Avatar
router.patch(
  "/avatars/:noticesId",
  authMiddleware,
  uploadMiddleware.single("avatar"),
  validatinFileType,
  asyncWrapper(patchNoticeAvatarController)
);
router.get("/", asyncWrapper(getAllCategoriesController));
router.get("/:noticesId", asyncWrapper(getNoticesByCategoryController));
router.post(
  "/",
  authMiddleware,
  uploadMiddleware.single("avatar"),
  validatinFileType,
  validationBody(schemas.noticeAddValidateSchema),
  asyncWrapper(addNoticeController)
);

module.exports = router;
