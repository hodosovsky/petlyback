const { News } = require("../../db/newsModel");

const getAllNewsService = async (search, page, limit) => {
  limit = +limit > 8 ? 8 : +limit;
  page = +page;

  const searchObj = {};

  if (search) searchObj.title = { $regex: search, $options: "i" };

  const dataLength = await News.countDocuments(searchObj);

  const data = await News.find(searchObj)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ date: -1 })
    .select(["-createdAt", "-updatedAt"]);

  return {
    data,
    perPage: limit,
    total: dataLength,
    newsLeft: dataLength - page * limit > 0 ? dataLength - page * limit : 0,
    pageCount: Math.ceil(dataLength / +limit),
    currentPage: page,
    newsOnPage: data.length,
  };
};

module.exports = { getAllNewsService };
