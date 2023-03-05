const { Notices } = require("../../db/noticesModel");
const { User } = require("../../db/userModel");

const deleteNoticeService = async (owner, _id) => {
  await Notices.findOneAndRemove({ _id, owner });

  await User.updateMany({}, { $pull: { favorites: _id } });
};

module.exports = { deleteNoticeService };
