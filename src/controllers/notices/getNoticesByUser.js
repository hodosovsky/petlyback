const {
  getNoticesByUserService,
} = require("../../services/notices/getNoticesByUserService");

const getNoticesByUserController = async (req, res) => {
  const { _id } = req.user;
  let { search, page = 1, limit = 8 } = req.query;

  const {
    data,
    perPage,
    total,
    noticesLeft,
    pageCount,
    currentPage,
    noticesOnPage,
  } = await getNoticesByUserService(_id, search, page, limit);
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

module.exports = { getNoticesByUserController };
