const fs = require("fs").promises;
// const { use } = require("passport");
const { Pet } = require("../../db/petModel");
const { User } = require("../../db/userModel");
const { ValidationError } = require("../../helpers/errors");
const { petPhotoUpload } = require("../../helpers/petPhotoUpload");

const addPet = async (data, file, owner) => {
  const { name, birthday, breed, comments } = data;

  const newPet = await Pet.create({
    name,
    birthday,
    breed,
    comments,
    owner,
  });

  const user = await User.findById(owner);

  user.userPets.push(newPet._id);
  await user.save();

  try {
    if (file) {
      const [, extension] = file.path?.split(".");

      if (
        extension.toLowerCase() !== "jpg" &&
        extension.toLowerCase() !== "png"
      )
        next(new ValidationError("file must be '.jpg' or '.png'"));

      // await fs.unlinkSync(file.path);

      const { path, fieldname } = file;
      console.log(path);
      const { url: avatarUrl } = await petPhotoUpload(
        path,
        fieldname,
        newPet._id
      );

      const petWithAvatar = await Pet.findOneAndUpdate(
        newPet._id,
        {
          avatarURL: avatarUrl,
        },
        {
          new: true,
        }
      );

      return petWithAvatar;
    }
    return newPet;
  } catch (error) {
    throw new ValidationError("Load file error");
  }
};

module.exports = { addPet };
