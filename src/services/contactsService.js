const { Contact } = require("../db/contactsModel");
const { WrongParametersError } = require("../helpers/errors");

const getContacts = async (owner) => {
  const contacts = await Contact.find({ owner });
  return contacts;
};

const getContactByID = async (contactId, ownerId) => {
  const contact = await Contact.findOne({
    _id: contactId,
    owner: ownerId,
  });

  if (!contact) {
    throw new WrongParametersError(`Contact with id '${contactId}' not found`);
  }
  return contact;
};

const addContact = async (data, owner) => {
  const { name, email, phone } = data;
  const newContact = new Contact({ name, email, phone, owner });
  await newContact.save();
  return newContact;
};

const deleteContactById = async (contactId, ownerId) => {
  const contact = await Contact.findOne({
    _id: contactId,
    owner: ownerId,
  });

  if (!contact) {
    throw new WrongParametersError(`Contact with id '${contactId}' not found`);
  }

  await Contact.findOneAndRemove({
    _id: contactId,
    owner: ownerId,
  });
};

const changeContactById = async (contactId, body, ownerId) => {
  const contact = await Contact.findOne({
    _id: contactId,
    owner: ownerId,
  });
  if (!contact) {
    throw new WrongParametersError(`Contact with id '${contactId}' not found`);
  }
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner: ownerId },
    body,
    { new: true }
  );
  return updatedContact;
};

const patchContactById = async (contactId, body, ownerId) => {
  const contact = await Contact.findOne({
    _id: contactId,
    owner: ownerId,
  });
  if (!contact) {
    throw new WrongParametersError(`Contact with id '${contactId}' not found`);
  }

  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner: ownerId },
    {
      $set: body,
    },
    { new: true }
  );

  return updatedContact;
};

const patchFavoriteContactById = async (contactId, body, ownerId) => {
  const contact = await Contact.findOne({
    _id: contactId,
    owner: ownerId,
  });
  if (!contact) {
    throw new WrongParametersError(`Contact with id '${contactId}' not found`);
  }

  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner: ownerId },
    {
      $set: body,
    }
  );

  return updatedContact;
};

const updateStatusContact = async (contactId, body, ownerId) => {
  const contact = await Contact.findOne({
    _id: contactId,
    owner: ownerId,
  });
  if (!contact) {
    throw new WrongParametersError(`Contact with id '${contactId}' not found`);
  }

  updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner: ownerId },
    body,
    {
      new: true,
    }
  );

  return updatedContact;
};

module.exports = {
  getContacts,
  getContactByID,
  addContact,
  deleteContactById,
  changeContactById,
  patchContactById,
  patchFavoriteContactById,
  updateStatusContact,
};
