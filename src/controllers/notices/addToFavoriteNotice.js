
const { RequestError } = require("../../helpers/RequestError");
const { Notices } = require("../../db/noticesModel");
const {User} = require("../../db/userModel");


const addToFavoriteNotice = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: noticeId } = req.params;
 

  const notice = await Notices.findById(noticeId);
  if (!notice) {
    throw RequestError(404, "Notice not found");
  }

  const { favorites } = await User.findById(userId);
  if (favorites.includes(noticeId)) {
    throw RequestError(400, "Notice is already in Wishlist");
  }
  // 
  await User.findByIdAndUpdate(userId, { $push: { favorites: noticeId } }, {new: true})
  return res.status(200).json({"message": "Notice added to wishlist", "notice": notice});
};

module.exports = {addToFavoriteNotice};