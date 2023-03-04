const { Notices } = require("../../db/noticesModel");

const getAllCategoriesService = async (search, page, limit) => {
  limit = +limit > 8 ? 8 : +limit;
  page = +page;

  if (search) {
    const allData = await Notices.find({
      title: { $regex: search, $options: "i" },
    });

    const data = await Notices.find({
      title: { $regex: search, $options: "i" },
    })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ updatedAt: -1 })
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

  const allData = await Notices.find({});
  const data = await Notices.find({})
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ updatedAt: -1 })
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
};

module.exports = {
  getAllCategoriesService,
};
