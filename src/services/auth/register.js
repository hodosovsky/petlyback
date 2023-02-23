const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { User } = require("../../db/userModel");
const { login } = require("../auth/login");
const {
  NotAuthorizedError,
  EmailConflictError,
  ValidationError,
} = require("../../helpers/errors");
const { createToken } = require("../../helpers/apiHelpers");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs").promises;
const Jimp = require("jimp");

const registration = async ({ name, email, password, phone, city }) => {
  const findedUser = await User.findOne({ email });

  if (findedUser) throw new EmailConflictError(`Email ${email} in use`);

  const avatarURL = gravatar.url(
    email,
    { s: "250", r: "x", d: "robohash" },
    true
  );

  const user = new User({
    name,
    email,
    password,
    avatarURL,
    phone,
    city,
  });

  await user.save();

  const { token } = await login(email, password);

  return { token, user };
};

module.exports = { registration };
