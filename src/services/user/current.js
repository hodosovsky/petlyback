const { User } = require("../../db/userModel");
const { NotAuthorizedError } = require("../../helpers/errors");
const jsonwebtoken = require("jsonwebtoken");

const getCurrentUser = async (token) => {
  const user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
  const findedUser = await User.findByIdAndUpdate(user?._id).select([
    "-password",
    "-createdAt",
    "-updatedAt",
  ]);

  if (!findedUser) throw new NotAuthorizedError("Not authorized");

  return findedUser;
};

module.exports = { getCurrentUser };
