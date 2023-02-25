const { Notices } = require("../../db/noticesModel");
const gravatar = require("gravatar");
const { cloudUpload } = require("../../helpers/cloudUpload");
const { ValidationError } = require("../../helpers/errors");

const addNotice = async (data, file, owner) => {
  const {name} = data
  const notice = await Notices.findOne({ name });
  if (notice) {
    throw new ValidationError(`Email ${name} in use`);;
  }
  let avatarURL = null;
  if (!file) {
    avatarURL = gravatar.url(owner, { s: "250", r: "x", d: "robohash" }, true);
  }
  if (file) {
    const { path, fieldname } = file;
    const { url: cloudURL } = await cloudUpload(path, fieldname, owner);
    avatarURL = cloudURL;
  }

  const newNotice = await Notices.create({
    ...data,
    avatar: avatarURL,
    owner: owner,
  });
  return newNotice;
};

module.exports = { addNotice };
