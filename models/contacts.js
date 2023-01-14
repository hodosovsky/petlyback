const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("./models/contacts.json");

const readContacts = () => fs.readFile(contactsPath, "utf8");

const listContacts = async () => {
  const contacts = await readContacts();

  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  // const response = await readContacts();
  // const contacts = JSON.parse(response);
  const contacts = await listContacts();
  const findedContact = contacts.find((contact) => contact.id === contactId);

  return findedContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const findedContact = contacts.filter((contact) => contact.id === contactId);

  return findedContact;
};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
