const express = require("express");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const { addPetController } = require("../../controllers/pets/addPet");
const { uploadMiddleware } = require("../../helpers/multerConfig");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  uploadMiddleware.single("avatar"),
  asyncWrapper(addPetController)
);

module.exports = router;
