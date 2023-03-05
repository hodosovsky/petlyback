const {
  getNoticesByCategoryService,
} = require("../../services/notices/getNoticesByCategory");

const getNoticesByCategoryController = async (req, res) => {
  const { noticesId } = req.params;
  const { search, page = 1, limit = 8 } = req.query;
 
  const data = await getNoticesByCategoryService(
    noticesId,
    search,
    page,
    limit
  );

  res.json(data);
};

module.exports = { getNoticesByCategoryController };
