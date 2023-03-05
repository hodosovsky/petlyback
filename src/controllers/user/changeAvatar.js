const { changeAvatar } = require("../../services/user/changeAvatar");

const changeAvatarController = async (req, res) => {
  const { _id } = req.user;

  const avatarURL = await changeAvatar(req.file, _id);

  res.status(200).json({ avatarURL });
};

module.exports = { changeAvatarController };
