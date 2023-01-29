const express = require("express");

const {
  registrationController,
  loginController,
  logoutController,
  currentUserController,
  changeSubscriptionController,
} = require("../../controllers/authController");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  userAuthValidation,
  changeSubscriptionValidation,
} = require("../../middlewares/middlewares");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/register",
  userAuthValidation,
  asyncWrapper(registrationController)
);
router.post("/login", userAuthValidation, asyncWrapper(loginController));
router.post("/logout", authMiddleware, asyncWrapper(logoutController));
router.get("/current", authMiddleware, asyncWrapper(currentUserController));
router.patch(
  "/",
  authMiddleware,
  changeSubscriptionValidation,
  asyncWrapper(changeSubscriptionController)
);

module.exports = router;
