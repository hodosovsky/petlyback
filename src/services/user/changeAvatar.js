const { User } = require("../../db/userModel");
const { ValidationError } = require("../../helpers/errors");
const { cloudUpload } = require("../../helpers/cloudUpload");

const fs = require("fs").promises;

const changeAvatar = async (file, id) => {
  if (!file) {
    throw new ValidationError("transfer file, please");
  }

  const { path: temporaryName } = file;
  const [, extension] = temporaryName?.split(".");

  if (extension.toLowerCase() !== "jpg" && extension.toLowerCase() !== "png") {
    await fs.unlink(temporaryName);
    throw new ValidationError("file must be '.jpg' or '.png'");
  }

  try {
    const { path, fieldname } = file;
    const { url: avatarUrl } = await cloudUpload(path, fieldname, id);

    await User.findOneAndUpdate(
      id,
      {
        avatarURL: avatarUrl,
      },
      {
        new: true,
      }
    );
    return avatarUrl;
  } catch (error) {
    throw new ValidationError("Load file error");
  }
};

module.exports = {
  changeAvatar,
};
