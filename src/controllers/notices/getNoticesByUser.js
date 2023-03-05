const {
  getNoticesByUserService,
} = require("../../services/notices/getNoticesByUserService");

const getNoticesByUserController = async (req, res) => {
  const { _id } = req.user;
  const { search, page = 1, limit = 8 } = req.query;

  const data = await getNoticesByUserService(_id, search, page, limit);
  res.json(data);
};

module.exports = { getNoticesByUserController };
