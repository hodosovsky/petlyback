const {User} = require("../../db/userModel");
const { ValidationError } = require("../../helpers/errors");

const addToFavoriteNotice = async (req, res) => {
  const { noticeId } = req.params;
  const { id: userId } = req.user;
  const result = await User.findByIdAndUpdate(
    { _id: userId },
    { $push: { favorites: noticeId } }
  );

  if (!result) {
    throw ValidationError(404);
  }
  res.json(result);
};

module.exports = {addToFavoriteNotice} ;