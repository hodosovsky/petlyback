const { News } = require("../../db/newsModel");
const { WrongParametersError } = require("../../helpers/errors");
const getAllNewsService = async (search, page, limit) => {
  limit = +limit > 8 ? 8 : +limit;
  page = +page;
  // if (search) {
  //   const data = await News.find({
  //     title: { $regex: search, $options: "i" },
  //   }).sort({ date: -1 });
  //   if (!data.length) throw new WrongParametersError("News not found");
  //   return data;
  // }

  // const data = await News.find({}).sort({ date: -1 });
  // return data;
  if (search) {
    const allData = await News.find({
      title: { $regex: search, $options: "i" },
    });

    const data = await News.find({
      title: { $regex: search, $options: "i" },
    })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ date: -1 })
      .select(["-createdAt", "-updatedAt"]);

    return {
      data,
      perPage: limit,
      total: allData.length,
      noticesLeft:
        allData.length - page * limit > 0 ? allData.length - page * limit : 0,
      pageCount: Math.ceil(allData.length / +limit),
      currentPage: page,
      noticesOnPage: data.length,
    };
  }
  const allData = await News.find({});
  const data = await News.find({})
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ date: -1 })
    .select(["-createdAt", "-updatedAt"]);
  return {
    data,
    perPage: limit,
    total: allData.length,
    newsLeft:
      allData.length - page * limit > 0 ? allData.length - page * limit : 0,
    pageCount: Math.ceil(allData.length / +limit),
    currentPage: page,
    newsOnPage: data.length,
  };
};

module.exports = { getAllNewsService };
