const { changeAvatar } = require("../../services/user/changeAvatar");
const { changePetAvatar } = require("../../services/pets/changePetAvatar");

const changeAvatarController = async (req, res) => {
  const { petId } = req.params;
  const { _id: ownerId } = req.user;

  const avatarURL = await changePetAvatar(req.file, petId, ownerId);

  res.status(200).json({ avatarURL });
};

module.exports = { changeAvatarController };
