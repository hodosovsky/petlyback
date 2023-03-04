const {
  addToFavoriteNoticeService,
} = require("../../services/notices/addToFavoriteNotice");

const addToFavoriteNotice = async (req, res) => {
  const { _id: userId } = req.user;
  console.log("_id:", userId);

  const { noticeId } = req.params;
  const data = await addToFavoriteNoticeService(noticeId, userId);
  res.json(data);
};

module.exports = { addToFavoriteNotice };
