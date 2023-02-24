const { User } = require("../../db/userModel");
const { NotAuthorizedError } = require("../../helpers/errors");
const { createToken } = require("../../helpers/apiHelpers");
const bcrypt = require("bcrypt");

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  console.log(email);
  if (!user) throw new NotAuthorizedError(`No user with email ${email} found`);

  if (!(await bcrypt.compare(password, user.password)))
    throw new NotAuthorizedError("Wrong password");

  const token = await createToken(user);

  // const { _id, subscription, email } = user;

  return { token, user };
};

module.exports = { login };
