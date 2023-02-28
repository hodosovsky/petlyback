const fs = require("fs").promises;
// const { use } = require("passport");
const { Pet } = require("../../db/petModel");
const { User } = require("../../db/userModel");
const { ValidationError } = require("../../helpers/errors");
const { petPhotoUpload } = require("../../helpers/petPhotoUpload");

const addPet = async (data, file, owner) => {
  let newUrl = null;

  if (file) {
    const { path, fieldname } = file;
    const { url } = await petPhotoUpload(path, fieldname, owner);
    newUrl = url;
  }

  const newPet = await Pet.create({
    ...data,
    avatarURL: newUrl,
    owner,
  });

  await User.findByIdAndUpdate(
    owner,
    { $push: { userPets: newPet._id.toString() } },
    { new: true }
  );
  return newPet;
};

module.exports = { addPet };
