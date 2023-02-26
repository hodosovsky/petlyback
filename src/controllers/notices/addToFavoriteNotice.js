
const { RequestError } = require("../../helpers/RequestError");
const { Notices } = require("../../db/noticesModel");
const {User} = require("../../db/userModel");


const addToFavoriteNotice = async (req, res) => {
  const { _id: userId } = req.user;
  const { noticeId } = req.params;
 
  const notice = await Notices.findById(noticeId);

  if (!notice) {
    throw RequestError(404, "Notice not found");
  }
 
  const { favorites } = await User.findById(userId);
  if (favorites.includes(noticeId)) {
    await User.findByIdAndUpdate(userId, { $pull: { favorites: noticeId } }, {new: true})
  return res.status(200).json({"message": "Notice removed from favorite", "notice": notice});
    // const user = await User.findById(userId);
    // const idx = user.userPets.indexOf(noticeId);
    // user.favorites.splice(idx, 1);
    // await user.save();
    // return res.status(200).json({"message": "Notice removed from favorite", "notice": notice});
  }
  // 
  await User.findByIdAndUpdate(userId, { $push: { favorites: noticeId } }, {new: true})
  return res.status(200).json({"message": "Notice added to favorite", "notice": notice});
};

module.exports = {addToFavoriteNotice};