const { registration, login } = require("../services/authService");

const registrationController = async (req, res) => {
  const { email, password } = req.body;
  const { userEmail, subscription, token } = await registration(
    email,
    password
  );

  res.status(201).json({
    token,
    user: {
      email: userEmail,
      subscription,
    },
  });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const { token, _id, subscription } = await login(email, password);

  res.json({ token, user: { userId: _id, email, subscription } });
};

module.exports = { registrationController, loginController };
