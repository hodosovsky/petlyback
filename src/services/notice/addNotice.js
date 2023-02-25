const { Notices } = require("../../db/noticesModel");
const gravatar = require("gravatar");
const { cloudUpload } = require("../../helpers/cloudUpload");
const { ValidationError } = require("../../helpers/errors");

const addNotice = async (data, file, owner) => {
  if (!file) {
    throw new ValidationError(`no file`);
  }
  const { path, fieldname } = file;
  const { url } = await cloudUpload(path, fieldname, owner);

  const newNotice = await Notices.create({
    ...data,
    avatar: url,
    owner: owner,
  });
  return newNotice;
};

module.exports = { addNotice };
