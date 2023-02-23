const { login } = require("../../services/auth/login");

const loginController = async (req, res) => {
  const { email: reqEmail, password } = req.body;
  const { token, _id, subscription, email } = await login(reqEmail, password);

  res.status(200).json({ token, user: { userId: _id, email, subscription } });
};

module.exports = { loginController };
