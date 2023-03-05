const {
  deleteNoticeService,
} = require("../../services/notices/deleteNoticeService");

const deleteNoticeController = async (req, res) => {
  const { _id: owner } = req.user;
  const { noticeId } = req.params;

  await deleteNoticeService(owner, noticeId);

  res.json({ messge: "Notice delete" });
};

module.exports = { deleteNoticeController };
