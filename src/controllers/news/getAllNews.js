const { ValidationError } = require("../../helpers/errors");
const { News } = require("../../db/newsModel");

const getAllNews = async (req, res, next) => {
  const result = await News.find({});

  if (!result) {
    throw new ValidationError(404, "Not found");
  }

  res.json(result);
};

module.exports = getAllNews;
