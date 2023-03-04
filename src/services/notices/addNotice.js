const { Notices } = require("../../db/noticesModel");
const { User } = require("../../db/userModel");
const { petPhotoUpload } = require("../../helpers/petPhotoUpload");

const addNotice = async (data, file, owner) => {
  let newUrl = null;

  if (file) {
    const { path, fieldname } = file;
    const { url } = await petPhotoUpload(path, fieldname, owner);
    newUrl = url;
  }
  const { email, phone } = await User.findById(owner);

  const newNotice = await Notices.create({
    ...data,
    avatar: newUrl,
    owner,
    email,
    phone,
  });

  return newNotice;
};

module.exports = { addNotice };
