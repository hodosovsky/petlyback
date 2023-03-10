const bcrypt = require("bcrypt");
const { User } = require("../../db/userModel");
const { NotAuthorizedError } = require("../../helpers/errors");

const changeEmailService = async (email, password, id) => {
  const user = await User.findById(id);

  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError("Wrong password");
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { email },
    { new: true }
  );

  return updatedUser;
};

module.exports = {
  changeEmailService,
};
