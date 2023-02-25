const { Notices } = require("../../db/noticesModel");
const gravatar = require("gravatar");
const { petPhotoUpload } = require("../../helpers/petPhotoUpload");
const { ValidationError } = require("../../helpers/errors");

const addNotice = async (data, file, owner) => {
  const { path, fieldname } = file;
  const { url } = await petPhotoUpload(path, fieldname, owner);

  const newNotice = await Notices.create({
    ...data,
    avatar: url,
    owner: owner,
  });
  return newNotice;
};

module.exports = { addNotice };
