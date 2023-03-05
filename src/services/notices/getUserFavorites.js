const { Notices } = require("../../db/noticesModel");
const { User } = require("../../db/userModel");
const { ValidationError } = require("../../helpers/errors");

const getUserFavoritesService = async (_id, search, page, limit) => {
  const currentUser = await User.findById(_id);

  if (!currentUser) {
    throw ValidationError(404);
  }

  limit = +limit > 8 ? 8 : +limit;
  page = +page;

  if (search) {
    const allData = await Notices.find({
      _id: { $in: currentUser.favorites },
      title: { $regex: search, $options: "i" },
    });

    const data = await Notices.find({
      _id: { $in: currentUser.favorites },
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

  const allData = await Notices.find({
    _id: { $in: currentUser.favorites },
  });

  const data = await Notices.find({
    _id: { $in: currentUser.favorites },
  })
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ updatedAt: -1 });
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

module.exports = { getUserFavoritesService };
