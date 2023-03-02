const {
  getAllCategoriesService,
} = require("../../services/notices/getAllCategories");

const getAllCategoriesController = async (req, res) => {
  let { search, page = 1, limit = 8 } = req.query;

  const {
    data,
    perPage,
    total,
    noticesLeft,
    pageCount,
    currentPage,
    noticesOnPage,
  } = await getAllCategoriesService(search, page, limit);

  res.json({
    data,
    perPage,
    total,
    noticesLeft,
    pageCount,
    currentPage,
    noticesOnPage,
  });
};

module.exports = { getAllCategoriesController };
