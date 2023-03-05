const { getAllNewsService } = require("../../services/news/getAllNewsService");

const getAllNews = async (req, res, next) => {
  const { search, page = 1, limit = 8 } = req.query;

  const data = await getAllNewsService(search, page, limit);
  res.json(data);
};

module.exports = getAllNews;
