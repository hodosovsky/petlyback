const {
  getNoticesByCategoryService,
} = require("../../services/notices/getNoticesByCategory");

const getNoticesByCategoryController = async (req, res) => {
  const { noticesId } = req.params;
  let { search, page = 1, limit = 8 } = req.query;
  const {
    data,
    perPage,
    total,
    noticesLeft,
    pageCount,
    currentPage,
    noticesOnPage,
  } = await getNoticesByCategoryService(noticesId, search, page, limit);

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

module.exports = { getNoticesByCategoryController };
