const { getCurrentUser } = require("../../services/user/current");

const currentUserController = async (req, res) => {
  const [, token] = req.headers.authorization.split(" ");

  const user = await getCurrentUser(token);

  res.status(200).json({ token: user.token, user });
};

module.exports = { currentUserController };
