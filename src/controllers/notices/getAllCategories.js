const {
  getAllCategoriesService,
} = require("../../services/notices/getAllCategories");

const getAllCategoriesController = async (req, res) => {
  const { search } = req.query;

  const data = await getAllCategoriesService(search);
  res.json(data);
};

module.exports = { getAllCategoriesController };
