const express = require("express");

const { registrationController } = require("../../controllers/auth/register");
const { loginController } = require("../../controllers/auth/login");
const { logoutController } = require("../../controllers/auth/logout");
const { currentUserController } = require("../../controllers/user/current");
const {
  changeAvatarController,
} = require("../../controllers/user/changeAvatar");
const { patchUserController } = require("../../controllers/user/patchUser");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  userAuthValidation,
  userLoginValidation,
  changeUserValidation,
} = require("../../middlewares/middlewares");
const { authMiddleware, validatinFileType } = require("../../middlewares");
const { uploadMiddleware } = require("../../helpers/multerConfig");
// const passport = require("../../middlewares/googleAuth");
const router = express.Router();

router.post(
  "/register",
  userAuthValidation,
  asyncWrapper(registrationController)
);
router.post("/login", userLoginValidation, asyncWrapper(loginController));
router.post("/logout", authMiddleware, asyncWrapper(logoutController));
router.get("/current", authMiddleware, asyncWrapper(currentUserController));
router.patch(
  "/",
  authMiddleware,
  changeUserValidation,
  asyncWrapper(patchUserController)
);
router.patch(
  "/avatars",
  authMiddleware,
  uploadMiddleware.single("avatar"),
  validatinFileType,
  asyncWrapper(changeAvatarController)
);

module.exports = router;
