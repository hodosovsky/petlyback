const { Notices } = require("../../db/noticesModel");
const { petPhotoUpload } = require("../../helpers/petPhotoUpload");
const { cloudUpload } = require("../../helpers/cloudUpload");

const addNotice = async (data, file, owner) => {
  let newUrl = null;
  
  if (file) {
    const { path, fieldname } = file;
    const { url } = await cloudUpload(path, fieldname, owner);
    newUrl = url;
  }

  const newNotice = await Notices.create({
    ...data,
    avatar: newUrl,
    owner,
  });

  return newNotice;
};

module.exports = { addNotice };
