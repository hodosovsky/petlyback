const { Notices } = require("../../db/noticesModel");
const { User } = require("../../db/userModel");
const { ValidationError } = require("../../helpers/errors");
const { getCurrentUser } = require("../../services/user/current");

const getUserFavorites = async (req, res) => {
  const [, token] = req.headers.authorization.split(" ");
  const { _id } = await getCurrentUser(token);

  const currentUser = await User.findOne({ _id });

  if (!currentUser) {
    throw ValidationError(404);
  }
  const notices = await Notices.find({
    _id: { $in: currentUser.favorites },
  }).sort({ updatedAt: -1 });
  res.status(200).json(notices);
};

module.exports = { getUserFavorites };
