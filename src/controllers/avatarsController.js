const { getCurrentUser } = require("../services/authService");
const { avatarSave } = require("../services/avatarsUploadService");
const { User } = require("../db/userModel");

const avatarsUploadController = async (req, res) => {
  res.json({ status: "success" });
};

const changeAvatarController = async (req, res) => {
  const { path: temporaryName } = req.file;

  try {
    const [, token] = req.headers.authorization.split(" ");
    const { _id } = await getCurrentUser(token);
    const avatarPath = await avatarSave(temporaryName, _id);
    const { avatarURL } = await User.findOneAndUpdate(
      _id,
      {
        avatarURL: avatarPath.replace(/\\/g, "/"),
      },
      {
        new: true,
      }
    );

    res.status(200).json({ avatarURL });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  avatarsUploadController,
  changeAvatarController,
};
