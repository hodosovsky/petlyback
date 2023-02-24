const {User} = require("../../db/userModel");
const { ValidationError } = require("../../helpers/errors");
const {getCurrentUser} = require("../../services/auth/current");

const getUserFavorites = async (req, res) => {
    const [, token] = req.headers.authorization.split(" ");
  const { _id } = await getCurrentUser(token);

  const currentUser = await User.findOne({ _id }).select("favorites");

  const result = currentUser;

  if (!result) {
    throw ValidationError(404);
  }
  res.status(200).json(result);
};

module.exports = { getUserFavorites };