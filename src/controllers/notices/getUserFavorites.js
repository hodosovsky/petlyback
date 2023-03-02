const { Notices } = require("../../db/noticesModel");
const { User } = require("../../db/userModel");
const { ValidationError } = require("../../helpers/errors");
const { getCurrentUser } = require("../../services/user/current");

const getUserFavorites = async (req, res) => {
  const [, token] = req.headers.authorization.split(" ");
  const { _id } = await getCurrentUser(token);

  const currentUser = await User.findOne({ _id });

  if (!currentUser) {
    throw ValidationError(404);
  }
  let { search, page = 1, limit = 8 } = req.query;

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
      .sort({ date: -1 })
      .select(["-createdAt", "-updatedAt"]);

    res.status(200).json({
      data,
      perPage: limit,
      total: allData.length,
      noticesLeft:
        allData.length - page * limit > 0 ? allData.length - page * limit : 0,
      pageCount: Math.ceil(allData.length / +limit),
      currentPage: page,
      noticesOnPage: data.length,
    });
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
  res.status(200).json({
    data,
    perPage: limit,
    total: allData.length,
    noticesLeft:
      allData.length - page * limit > 0 ? allData.length - page * limit : 0,
    pageCount: Math.ceil(allData.length / +limit),
    currentPage: page,
    noticesOnPage: data.length,
  });
};

module.exports = { getUserFavorites };
