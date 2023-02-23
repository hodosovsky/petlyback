const { User } = require("../../db/userModel");
const { ValidationError } = require("../../helpers/errors");

const path = require("path");
const fs = require("fs").promises;
const Jimp = require("jimp");

const changeAvatar = async (file, id) => {
  if (!file) {
    throw new ValidationError("transfer file, please");
  }

  const storeImage = path.resolve("./public/avatars");
  const { path: temporaryName } = file;
  const [, extension] = temporaryName?.split(".");

  if (extension.toLowerCase() !== "jpg" && extension.toLowerCase() !== "png") {
    await fs.unlink(temporaryName);
    throw new ValidationError("file must be '.jpg' or '.png'");
  }

  const newName = id + "." + extension;
  const fileName = path.join(storeImage, newName);

  try {
    const avatarDir = await fs.readdir(storeImage);
    const oldAvatar = avatarDir.find((el) => el.includes(id));

    await fs.rename(temporaryName, fileName);

    if (oldAvatar) {
      const [, extension] = fileName?.split(".");
      const [, oldExtension] = oldAvatar.split(".");
      if (extension !== oldExtension)
        await fs.unlink(storeImage + "/" + oldAvatar);
    }

    Jimp.read(fileName, (err, avatar) => {
      if (err) throw err;
      avatar
        .resize(250, 250) // resize
        .write(fileName); // save
    });

    const avatarPath = path.join("avatars", newName);

    const { avatarURL } = await User.findOneAndUpdate(
      id,
      {
        avatarURL: avatarPath.replace(/\\/g, "/"),
      },
      {
        new: true,
      }
    );
    return avatarURL;
  } catch (error) {
    throw new ValidationError("Load file error");
  }
};

module.exports = {
  changeAvatar,
};
