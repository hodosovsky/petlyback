const { User } = require("../../db/userModel");

const changeUser = async (_id, body) => {
  const findedUser = await User.findByIdAndUpdate(
    _id,
    {
      $set: body,
    },
    {
      new: true,
    }
  );

  return findedUser;
};

module.exports = { changeUser };
