const { User } = require("../../db/userModel");
const { NotAuthorizedError } = require("../../helpers/errors");
const jsonwebtoken = require("jsonwebtoken");

const changeUser = async (token, body) => {
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

module.exports = { changeUser };
