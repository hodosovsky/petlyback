const { userProfile } = require("../../services/user/userProfile");

const userProfileController = async (req, res) => {
  const { profile, pets } = await userProfile(req.user._id);

  res.status(200).json({ user: profile, pets });
};

module.exports = { userProfileController };
