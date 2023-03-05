const { userProfile } = require("../../services/user/userProfile");

const userProfileController = async (req, res) => {
  const {
    _id,
    name,
    email,
    phone,
    birthday,
    city,
    favorites,
    userPets,
    avatarURL,
  } = req.user;

  const { pets } = await userProfile(_id);
  console.log(req.user);

  res.status(200).json({
    user: {
      _id,
      name,
      email,
      phone,
      birthday,
      city,
      favorites,
      userPets,
      avatarURL,
    },
    pets,
  });
};

module.exports = { userProfileController };
