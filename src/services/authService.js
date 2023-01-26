const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { User } = require("../db/userModel");
const { notAuthorizedError, emailConflictError } = require("../helpers/errors");

const registration = async (email, password) => {
  const findedUser = await User.findOne({ email });

  if (findedUser) throw new emailConflictError(`Email ${email} in use`);
  const user = new User({ email, password });

  await user.save();

  const { subscription } = user;
  return { email, subscription };
};

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) throw new notAuthorizedError(`No user with email ${email} found`);

  if (!(await bcrypt.compare(password, user.password)))
    throw new notAuthorizedError("Wrong password");

  const token = jsonwebtoken.sign(
    {
      _id: user._id,
      createdAt: user.createdAt,
    },
    process.env.JWT_SECRET
  );
  const { _id, subscription } = user;
  return { token, _id, subscription };
};

module.exports = {
  registration,
  login,
};
