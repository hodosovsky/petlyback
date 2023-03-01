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
  let { page, limit = 20, favorite } = req.query;

  limit = +limit > 20 ? 20 : +limit;
  page = +page;

  const notices = await Notices.find({
    _id: { $in: currentUser.favorites },
  })
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ updatedAt: -1 });
  res.status(200).json(notices);
};

module.exports = { getUserFavorites };
