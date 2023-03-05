const { addNotice } = require("../../services/notices/addNotice");

const addNoticeController = async (req, res) => {
  const { _id, email, phone } = req.user;

  const newNotice = await addNotice(req.body, req.file, _id, email, phone);

  res.status(201).json(newNotice);
};

module.exports = { addNoticeController };
