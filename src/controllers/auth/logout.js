const { logout } = require("../../services/auth/logout");

const logoutController = async (req, res) => {
  await logout(req.user._id);

  res.status(204).json();
};

module.exports = { logoutController };
