const { Pet } = require("../../db/petModel");
const { petPhotoUpload } = require("../../helpers/petPhotoUpload");

const fs = require("fs").promises;

const changePetAvatar = async (file, id, owner) => {
  let newUrl = null;

  if (file) {
    const { path, fieldname } = file;
    const { url } = await petPhotoUpload(path, fieldname, owner);
    newUrl = url;
  }

  await Pet.findOneAndUpdate(
    { _id: id, owner },
    {
      avatarURL: newUrl,
    },
    {
      new: true,
    }
  );

  return newUrl;
};

module.exports = {
  changePetAvatar,
};
