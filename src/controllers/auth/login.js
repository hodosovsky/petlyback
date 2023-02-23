const { login } = require("../../services/auth/login");

const loginController = async (req, res) => {
  // const { email: reqEmail, password } = req.body;
  const { token, user } = await login(req.body);

  res.status(200).json({
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      city: user.city,
      birthday: user.birthday,
      favorites: user.favorites,
      userPets: user.userPets,
    },
  });
};

module.exports = { loginController };
