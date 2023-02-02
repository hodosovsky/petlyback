const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { User } = require("../db/userModel");
const { NotAuthorizedError, EmailConflictError } = require("../helpers/errors");
const { createToken } = require("../helpers/apiHelpers");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs").promises;
const Jimp = require("jimp");

const registration = async (email, password) => {
  const findedUser = await User.findOne({ email });

  if (findedUser) throw new EmailConflictError(`Email ${email} in use`);

  const avatarURL = gravatar.url(
    email,
    { s: "100", r: "x", d: "robohash" },
    true
  );

  const user = new User({
    email,
    password,
    avatarURL,
  });

  await user.save();
  const { token } = await login(email, password);

  const { email: userEmail, subscription } = user;

  return { userEmail, subscription, token, avatarURL };
};

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) throw new NotAuthorizedError(`No user with email ${email} found`);

  if (!(await bcrypt.compare(password, user.password)))
    throw new NotAuthorizedError("Wrong password");

  const token = await createToken(user);

  const { _id, subscription } = user;

  return { token, _id, subscription };
};

const logout = async (token) => {
  if (!token || !jsonwebtoken.decode(token, process.env.JWT_SECRET))
    throw new NotAuthorizedError("Not authorized");

  try {
    const user = jsonwebtoken.decode(token, process.env.JWT_SECRET);
    const findedUser = await User.findByIdAndUpdate(user?._id, { token: null });
    if (!findedUser) throw new NotAuthorizedError("Not authorized");
  } catch (error) {
    throw new NotAuthorizedError("Not authorized");
  }
};

const getCurrentUser = async (token) => {
  if (!token || !jsonwebtoken.verify(token, process.env.JWT_SECRET))
    throw new NotAuthorizedError("Not authorized");

  try {
    const user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    const findedUser = await User.findByIdAndUpdate(user?._id);
    if (!findedUser) throw new NotAuthorizedError("Not authorized");
    return findedUser;
  } catch (error) {
    throw new NotAuthorizedError("Not authorized");
  }
};

const changeSubscription = async (token, body) => {
  if (!token || !jsonwebtoken.verify(token, process.env.JWT_SECRET))
    throw new NotAuthorizedError("Not authorized");

  try {
    const user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    const findedUser = await User.findByIdAndUpdate(
      user?._id,
      {
        $set: body,
      },
      {
        new: true,
      }
    );
    if (!findedUser) throw new NotAuthorizedError("Not authorized");
    return findedUser;
  } catch (error) {
    throw new NotAuthorizedError("Not authorized");
  }
};

const changeAvatar = async (temporaryName, id) => {
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

module.exports = {
  registration,
  login,
  logout,
  getCurrentUser,
  changeSubscription,
  changeAvatar,
};
