const {
  getAllCategoriesService,
} = require("../../services/notices/getAllCategories");

const getAllCategoriesController = async (req, res) => {
  const { search, page = 1, limit = 8 } = req.query;

  const data = await getAllCategoriesService(search, page, limit);

  res.json(data);
};

module.exports = { getAllCategoriesController };
