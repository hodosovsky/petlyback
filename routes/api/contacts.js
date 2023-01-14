const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    return res.json(contacts);
    // return JSON.parse(contacts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contacts = await getContactById(contactId);

    if (!contacts) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(contacts);
  } catch (err) {
    res.status(404).json({ message: "not found" });
  }
});

router.post("/", async (req, res, next) => {
  res.json({ message: "temcplate message" });
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await removeContact(contactId);

    if (!deletedContact.length) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({ message: "contact deleted" });
  } catch (err) {
    res.status(404).json({ message: "not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
