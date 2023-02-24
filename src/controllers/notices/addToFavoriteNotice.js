const { User } = require('../../db/userModel');
const { ValidationError } = require("../../helpers/errors");

const addToFavoriteNotice = async (req, res) => {
  const { _id, favorite } = req.user;
  const { id } = req.params;

  if (favorite.includes(id)) {
    throw new ValidationError('this notice is already in favorites');
  }

  const user = await User.findByIdAndUpdate(
    _id,
    { $push: { favorites: id } },
    { new: true }
  );
  if (!user) {
    throw new ValidationError('there is no such user');
  }

  res.status(201).json({
    favorites: user.favorite,
    message: 'notice add to favorite',
  });
};

module.exports = {addToFavoriteNotice} ;