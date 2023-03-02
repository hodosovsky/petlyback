const { Notices } = require("../../db/noticesModel");

const getNoticesByUserService = async (id, search, page, limit) => {
  limit = +limit > 8 ? 8 : +limit;
  page = +page;
  if (search) {
    const allData = await Notices.find({
      owner: id,
      title: { $regex: search, $options: "i" },
    });
    const data = await Notices.find({
      owner: id,
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
  const allData = await Notices.find({ owner: id });
  const data = await Notices.find({ owner: id })
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
};

module.exports = { getNoticesByUserService };
