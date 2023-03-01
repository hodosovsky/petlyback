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
  let { page = 1, limit = 8 } = req.query;

  limit = +limit > 8 ? 8 : +limit;
  page = +page;

  const allNotices = await Notices.find({
    _id: { $in: currentUser.favorites },
  });

  const notices = await Notices.find({
    _id: { $in: currentUser.favorites },
  })
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ updatedAt: -1 });
  res.status(200).json({
    notices,
    perPage: limit,
    total: allNotices.length,
    noticesLeft:
      allNotices.length - page * limit > 0
        ? allNotices.length - page * limit
        : 0,
    pageCount: Math.ceil(allNotices.length / +limit),
    currentPage: page,
    noticesOnPage: notices.length,
  });
};

module.exports = { getUserFavorites };
