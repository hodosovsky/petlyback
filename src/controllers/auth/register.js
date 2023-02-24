const { registration } = require("../../services/auth/register");

const registrationController = async (req, res) => {
  const { token, loginedUser } = await registration(req.body);

  res.status(201).json({
    token,
    user: {
      _id: loginedUser._id,
      name: loginedUser.name,
      email: loginedUser.email,
      avatarURL: loginedUser.avatarURL,
      city: loginedUser.city,
      phone: loginedUser.phone,
      birthday: loginedUser.birthday,
      favorites: loginedUser.favorites,
      userPets: loginedUser.userPets,
    },
  });
};

module.exports = { registrationController };
