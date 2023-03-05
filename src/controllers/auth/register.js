const { registration } = require("../../services/auth/register");

const registrationController = async (req, res) => {
  const { token, loginedUser } = await registration(req.body);
  const {
    _id,
    name,
    email,
    avatarURL,
    city,
    phone,
    birthday,
    favorites,
    userPets,
  } = loginedUser;
  res.status(201).json({
    token,
    user: {
      _id,
      name,
      email,
      avatarURL,
      city,
      phone,
      birthday,
      favorites,
      userPets,
    },
  });
};

module.exports = { registrationController };
