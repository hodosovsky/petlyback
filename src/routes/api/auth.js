const express = require("express");

const { registrationController } = require("../../controllers/auth/register");
const { loginController } = require("../../controllers/auth/login");
const { logoutController } = require("../../controllers/auth/logout");
const { currentUserController } = require("../../controllers/auth/current");
const {
  changeAvatarController,
} = require("../../controllers/auth/changeAvatar");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  userAuthValidation,
  userLoginValidation,
} = require("../../middlewares/middlewares");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const { uploadMiddleware } = require("../../helpers/multerConfig");
const router = express.Router();

router.post(
  "/register",
  userAuthValidation,
  asyncWrapper(registrationController)
);
router.post("/login", userLoginValidation, asyncWrapper(loginController));
router.post("/logout", authMiddleware, asyncWrapper(logoutController));
router.get("/current", authMiddleware, asyncWrapper(currentUserController));
// router.patch(
//   "/",
//   authMiddleware,
//   changeSubscriptionValidation,
//   asyncWrapper(changeSubscriptionController)
// );
router.patch(
  "/avatars",
  authMiddleware,
  uploadMiddleware.single("avatar"),

  asyncWrapper(changeAvatarController)
);

module.exports = router;
