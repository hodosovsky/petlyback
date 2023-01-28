const express = require("express");

const {
  registrationController,
  loginController,
  logoutController,
  currentUserController,
} = require("../../controllers/authController");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const { userAuthValidation } = require("../../middlewares/middlewares");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/users/register",
  userAuthValidation,
  asyncWrapper(registrationController)
);
router.post("/users/login", userAuthValidation, asyncWrapper(loginController));
router.post("/users/logout", authMiddleware, asyncWrapper(logoutController));
router.get(
  "/users/current",
  authMiddleware,
  asyncWrapper(currentUserController)
);

module.exports = router;
