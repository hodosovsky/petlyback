const { logout } = require("../../services/auth/logout");

const logoutController = async (req, res) => {
  const [, token] = req.headers.authorization.split(" ");

  await logout(token);

  res.status(204).json();
};

module.exports = { logoutController };
