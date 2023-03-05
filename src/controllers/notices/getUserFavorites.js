const {
  getUserFavoritesService,
} = require("../../services/notices/getUserFavorites");

const getUserFavorites = async (req, res) => {
  const { _id } = req.user;
  const { search, page = 1, limit = 8 } = req.query;

  const data = await getUserFavoritesService(_id, search, page, limit);

  res.json(data);
};

module.exports = { getUserFavorites };
