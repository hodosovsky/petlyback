const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { noticeId } = req.params;
  const result = isValidObjectId(noticeId);
  if (!result) {
    next(RequestError(404));
  }
  next();
};

module.exports = { isValidId } ;