const { getAllNewsService } = require("../../services/news/getAllNewsService");

const getAllNews = async (req, res, next) => {
  const { search, page = 1, limit = 8 } = req.query;

  const {
    data,
    perPage,
    total,
    noticesLeft,
    pageCount,
    currentPage,
    noticesOnPage,
  } = await getAllNewsService(search, page, limit);
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

module.exports = getAllNews;
