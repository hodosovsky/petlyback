const { changeAvatar } = require("../../services/user/changeAvatar");
const { getCurrentUser } = require("../../services/user/current");

const changeAvatarController = async (req, res) => {
  const [, token] = req.headers.authorization.split(" ");

  const { _id } = await getCurrentUser(token);

  const avatarURL = await changeAvatar(req.file, _id);

  res.status(200).json({ avatarURL });
};

module.exports = { changeAvatarController };
