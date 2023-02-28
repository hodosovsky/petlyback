const { userProfile } = require("../../services/user/userProfile");

const userProfileController = async (req, res) => {
  const { findedUser, pets } = await userProfile(req.user._id);

  res.status(200).json({ user: findedUser, pets });
};

module.exports = { userProfileController };
