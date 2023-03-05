const { Notices } = require("../../db/noticesModel");
const { WrongParametersError } = require("../../helpers/errors");

const getNoticesByCategoryService = async (category, search, page, limit) => {
  limit = +limit > 8 ? 8 : +limit;
  page = +page;

  const searchObj = {};

  if (["sell", "lost-found", "in-good-hands"].includes(category)) {
    searchObj.categoryName = category;
    if (search) searchObj.title = { $regex: search, $options: "i" };

    const dataLength = await Notices.countDocuments(searchObj);

    const data = await Notices.find(searchObj)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ updatedAt: -1 })
      .select(["-createdAt", "-updatedAt"]);

    return {
      data,
      perPage: limit,
      total: dataLength,
      noticesLeft:
        dataLength - page * limit > 0 ? dataLength - page * limit : 0,
      pageCount: Math.ceil(dataLength / +limit),
      currentPage: page,
      noticesOnPage: data.length,
    };
  }

  const data = await Notices.findById(category);

  if (!data) throw new WrongParametersError("Not found");

  return {
    data,
  };
};

module.exports = { getNoticesByCategoryService };
