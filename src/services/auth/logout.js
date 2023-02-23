const { User } = require("../../db/userModel");
const jsonwebtoken = require("jsonwebtoken");
const { NotAuthorizedError } = require("../../helpers/errors");

const logout = async (token) => {
  if (!token || !jsonwebtoken.verify(token, process.env.JWT_SECRET))
    throw new NotAuthorizedError("Not authorized");

  try {
    const user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    const findedUser = await User.findByIdAndUpdate(user?._id, { token: null });
    if (!findedUser) throw new NotAuthorizedError("Not authorized");
  } catch (error) {
    throw new NotAuthorizedError("Not authorized");
  }
};

module.exports = { logout };
