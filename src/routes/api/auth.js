const express = require("express");

const {
  registrationController,
  loginController,
} = require("../../controllers/authController");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const { userAuthValidation } = require("../../middlewares/middlewares");

const router = express.Router();

router.post(
  "/users/register",
  userAuthValidation,
  asyncWrapper(registrationController)
);
router.post("/users/login", userAuthValidation, asyncWrapper(loginController));
// router.post("/users/logout", asyncWrapper());

module.exports = router;
