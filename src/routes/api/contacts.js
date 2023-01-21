const express = require("express");

const {
  getContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  patchContactController,
  updateStatusContactController,
} = require("../../controllers/contactsController");

const {
  addContactsValidation,
  patchContactsValidation,
  patchFavoriteContactsValidation,
} = require("../../middlewares/middlewares");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const router = express.Router();

router.get("/", asyncWrapper(getContactsController));
router.get("/:contactId", asyncWrapper(getContactByIdController));
router.post("/", addContactsValidation, asyncWrapper(addContactController));
router.delete("/:contactId", asyncWrapper(removeContactController));
router.put(
  "/:contactId",
  addContactsValidation,
  asyncWrapper(updateContactController)
);
router.patch(
  "/:contactId",
  patchContactsValidation,
  asyncWrapper(patchContactController)
);
router.patch(
  "/:contactId/favorite",
  patchFavoriteContactsValidation,
  asyncWrapper(updateStatusContactController)
);

module.exports = router;
