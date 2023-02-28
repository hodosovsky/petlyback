const express = require("express");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const { addPetController } = require("../../controllers/pets/addPet");
const { deletePetController } = require("../../controllers/pets/deletePet");
const { uploadMiddleware } = require("../../helpers/multerConfig");
const { validatinFileType } = require("../../middlewares/validatinFileType");
const router = express.Router();

router.post(
  "/",
  authMiddleware,
  uploadMiddleware.single("avatar"),

  asyncWrapper(addPetController)
);
router.delete("/:petId", authMiddleware, asyncWrapper(deletePetController));
module.exports = router;
