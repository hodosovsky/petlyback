const { Notices } = require("../../db/noticesModel");
const { WrongParametersError } = require("../../helpers/errors");

const getNoticesByCategoryService = async (category, search, page, limit) => {
  limit = +limit > 8 ? 8 : +limit;
  page = +page;
  if (["sell", "lost-found", "in-good-hands"].includes(category)) {
    // const data = await Notices.find({ categoryName: category });
    // return data;
    if (search) {
      const allData = await Notices.find({
        categoryName: category,
        title: { $regex: search, $options: "i" },
      });
      console.log(search);
      const data = await Notices.find({
        categoryName: category,
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
    const allData = await Notices.find({ categoryName: category });
    const data = await Notices.find({ categoryName: category })
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

  const data = await Notices.findById(category);
  if (!data) throw new WrongParametersError("Not found");
  return {
    data,
  };
};

module.exports = { getNoticesByCategoryService };
