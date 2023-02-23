const { User } = require("../../db/userModel");
const { NotAuthorizedError } = require("../../helpers/errors");
const { createToken } = require("../../helpers/apiHelpers");
const bcrypt = require("bcrypt");

const login = async (reqEmail, password) => {
  const user = await User.findOne({ email: reqEmail });

  if (!user)
    throw new NotAuthorizedError(`No user with email ${reqEmail} found`);

  if (!(await bcrypt.compare(password, user.password)))
    throw new NotAuthorizedError("Wrong password");

  const token = await createToken(user);

  const { _id, subscription, email } = user;

  return { token, _id, subscription, email };
};

module.exports = { login };
