const { WrongParametersError } = require("../helpers/errors");
const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { noticeId } = req.params;
  const result = isValidObjectId(noticeId);

  if (!result) {
    next(new WrongParametersError("Not Found"));
  }

  next();
};

module.exports = { isValidId };
