const path = require("path");
const fs = require("fs").promises;
const Jimp = require("jimp");

const avatarSave = async (temporaryName, id) => {
  const storeImage = path.resolve("./public/avatars");

  const [, extension] = temporaryName.split(".");
  const newName = id + "." + extension;
  const fileName = path.join(storeImage, newName);
  await fs.rename(temporaryName, fileName);
  Jimp.read(fileName)
    .then((avatar) => {
      return avatar
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(fileName); // save
    })
    .catch((err) => {
      fs.unlink(fileName);
      console.error(err);
    });

  const avatarPath = path.join("avatars", newName);

  return avatarPath;
};

module.exports = { avatarSave };
