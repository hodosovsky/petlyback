const {
  patchNoticeService,
} = require("../../services/notices/patchNoticeService");

const patchNoticeController = async (req, res) => {
  const { noticesId } = req.params;
  const { _id: userId } = req.user._id;

  const data = await patchNoticeService(noticesId, userId, req.body);

  res.json({ message: data });
};

module.exports = { patchNoticeController };
