const { registration } = require("../../services/auth/register");

const registrationController = async (req, res) => {
  const {
    token,
    user: { name, email, avatarURL, city, phone },
  } = await registration(req.body);

  res.status(201).json({
    token,
    user: { name, email, avatarURL, city, phone },
  });
};

module.exports = { registrationController };
