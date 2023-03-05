const {
  deleteNoticeService,
} = require("../../services/notices/deleteNoticeService");

const deleteNoticeController = async (req, res) => {
  const { _id: owner } = req.user;
  const { noticeId } = req.params;

  const data = await deleteNoticeService(owner, noticeId);
  res.json(data);
};

module.exports = { deleteNoticeController };
