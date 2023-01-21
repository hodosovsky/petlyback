const {
  getContacts,
  getContactByID,
  addContact,
  deleteContactById,
  changeContactById,
  patchContactById,
} = require("../services/contactsService");

const getContactsController = async (req, res, next) => {
  const contacts = await getContacts();
  res.json(contacts);
};

const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await getContactByID(contactId);

  res.json(contact);
};

const addContactController = async (req, res, next) => {
  await addContact(req.body);

  res.status(201).json({ status: "created" });
};

const removeContactController = async (req, res, next) => {
  const { contactId } = req.params;

  await deleteContactById(contactId);
  res.json({ message: "contact deleted" });
};

const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;
  await changeContactById(contactId, req.body);
  res.status(200).json({ status: "success" });
};

const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;

  await patchContactById(contactId, req.body);

  res.status(200).json({ status: "success" });
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  patchContactController,
};
