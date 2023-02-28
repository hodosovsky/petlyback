const {
  getNoticesByCategoryService,
} = require("../../services/notices/getNoticesByCategory");

const getNoticesByCategoryController = async (req, res) => {
  const { noticesId } = req.params;
  const data = await getNoticesByCategoryService(noticesId);
  res.json(data);
};

module.exports = { getNoticesByCategoryController };
