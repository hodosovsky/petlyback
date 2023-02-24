const { getCurrentUser } = require("../../services/auth/current");

const currentUserController = async (req, res) => {
  const [, token] = req.headers.authorization.split(" ");

  const user = await getCurrentUser(token);

  res.status(200).json({ user });
};

module.exports = { currentUserController };
