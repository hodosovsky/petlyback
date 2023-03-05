const { login } = require("../../services/auth/login");

const loginController = async (req, res) => {
  const { token, user } = await login(req.body);

  const { name, _id, email, phone, city, birthday, favorites, userPets } = user;

  res.status(200).json({
    token,
    user: {
      name,
      _id,
      email,
      phone,
      city,
      birthday,
      favorites,
      userPets,
    },
  });
};

module.exports = { loginController };
