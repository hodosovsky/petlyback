const {
  getContacts,
  getContactByID,
  addContact,
  deleteContactById,
  changeContactById,
  patchContactById,
  updateStatusContact,
} = require("../services/contactsService");

const getContactsController = async (req, res, next) => {
  const { _id: ownerId } = req.user;
  let { page, limit = 20, favorite } = req.query;

  limit = +limit > 20 ? 20 : +limit;
  page = +page;

  const contacts = await getContacts(ownerId, { page, limit, favorite });
  res.json(contacts);
};

const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: ownerId } = req.user;

  const contact = await getContactByID(contactId, ownerId);

  res.json(contact);
};

const addContactController = async (req, res, next) => {
  const { _id: ownerId } = req.user;
  const newContact = await addContact(req.body, ownerId);

  res.status(201).json({ newContact });
};

const removeContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: ownerId } = req.user;

  await deleteContactById(contactId, ownerId);
  res.json({ message: "contact deleted" });
};

const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: ownerId } = req.user;

  const updatedContact = await changeContactById(contactId, req.body, ownerId);

  res.status(200).json(updatedContact);
};

const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: ownerId } = req.user;

  const updatedContact = await patchContactById(contactId, req.body, ownerId);

  res.status(200).json(updatedContact);
};

const updateStatusContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: ownerId } = req.user;

  const updatedContact = await updateStatusContact(
    contactId,
    req.body,
    ownerId
  );

  res.status(200).json(updatedContact);
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  patchContactController,
  updateStatusContactController,
};
