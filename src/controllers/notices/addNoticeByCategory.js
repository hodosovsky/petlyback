const { addNotice } = require("../../services/notices/addNotice");

const addNoticeController = async (req, res) => {
  const { _id: ownerId } = req.user;
  const newNotice = await addNotice(req.body, req.file, ownerId);
  res.status(201).json(newNotice);
};

module.exports = { addNoticeController };
