const { News } = require("../../db/newsModel");
const { WrongParametersError } = require("../../helpers/errors");
const getAllNewsService = async (search) => {
  if (search) {
    const data = await News.find({
      title: { $regex: search, $options: "i" },
    }).sort({ date: -1 });
    if (!data.length) throw new WrongParametersError("News not found");
    return data;
  }

  const data = await News.find({}).sort({ date: -1 });
  return data;
};

module.exports = { getAllNewsService };
