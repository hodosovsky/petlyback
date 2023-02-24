const { User } = require("../../db/userModel");
const { NotAuthorizedError } = require("../../helpers/errors");
const jsonwebtoken = require("jsonwebtoken");

const getCurrentUser = async (token) => {
  if (!token || !jsonwebtoken.verify(token, process.env.JWT_SECRET))
    throw new NotAuthorizedError("Not authorized");

  try {
    const user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    const findedUser = await User.findByIdAndUpdate(user?._id).select([
      "-password",
      "-createdAt",
      "-updatedAt",
    ]);
    if (!findedUser) throw new NotAuthorizedError("Not authorized");
    return findedUser;
  } catch (error) {
    throw new NotAuthorizedError("Not authorized");
  }
};

module.exports = { getCurrentUser };
