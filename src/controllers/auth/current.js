const { getCurrentUser } = require("../../services/auth/current");

const currentUserController = async (req, res) => {
  const [, token] = req.headers.authorization.split(" ");

  const { email, subscription } = await getCurrentUser(token);

  res.status(200).json({ email, subscription });
};

module.exports = { currentUserController };
