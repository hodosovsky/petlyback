const { Notices } = require("../../db/noticesModel");
const { User } = require("../../db/userModel");
const { RequestError } = require("../../helpers/errors");

const addToFavoriteNoticeService = async (noticeId, userId) => {
  const notice = await Notices.findById(noticeId);

  if (!notice) {
    throw RequestError(404, "Notice not found");
  }
  const { favorites } = await User.findById(userId);
  if (favorites.includes(noticeId)) {
    await User.findByIdAndUpdate(
      userId,
      { $pull: { favorites: noticeId } },
      { new: true }
    );
    return { message: "Notice removed from favorite", notice };
  }
  await User.findByIdAndUpdate(
    userId,
    { $push: { favorites: noticeId } },
    { new: true }
  );
  return { message: "Notice added to favorite", notice };
};

module.exports = { addToFavoriteNoticeService };
