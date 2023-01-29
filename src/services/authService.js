const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { User } = require("../db/userModel");
const { notAuthorizedError, emailConflictError } = require("../helpers/errors");
const { createToken } = require("../helpers/apiHelpers");

const registration = async (email, password) => {
  const findedUser = await User.findOne({ email });

  if (findedUser) throw new emailConflictError(`Email ${email} in use`);

  const user = new User({
    email,
    password,
  });

  await user.save();
  const token = await createToken(user);

  const { email: userEmail, subscription } = user;

  return { userEmail, subscription, token };
};

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) throw new notAuthorizedError(`No user with email ${email} found`);

  if (!(await bcrypt.compare(password, user.password)))
    throw new notAuthorizedError("Wrong password");

  const token = await createToken(user);

  const { _id, subscription } = user;

  return { token, _id, subscription };
};

const logout = async (token) => {
  if (!token || !jsonwebtoken.decode(token, process.env.JWT_SECRET))
    throw new notAuthorizedError("Not authorized");

  try {
    const user = jsonwebtoken.decode(token, process.env.JWT_SECRET);
    const findedUser = await User.findByIdAndUpdate(user?._id, { token: null });
    if (!findedUser) throw new notAuthorizedError("Not authorized");
  } catch (error) {
    throw new notAuthorizedError("Not authorized");
  }
};

const getCurrentUser = async (token) => {
  if (!token || !jsonwebtoken.verify(token, process.env.JWT_SECRET))
    throw new notAuthorizedError("Not authorized");

  try {
    const user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    const findedUser = await User.findByIdAndUpdate(user?._id);
    if (!findedUser) throw new notAuthorizedError("Not authorized");
    return findedUser;
  } catch (error) {
    throw new notAuthorizedError("Not authorized");
  }
};

const changeSubscription = async (token, body) => {
  if (!token || !jsonwebtoken.verify(token, process.env.JWT_SECRET))
    throw new notAuthorizedError("Not authorized");

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
    if (!findedUser) throw new notAuthorizedError("Not authorized");
    return findedUser;
  } catch (error) {
    throw new notAuthorizedError("Not authorized");
  }
};
module.exports = {
  registration,
  login,
  logout,
  getCurrentUser,
  changeSubscription,
};
