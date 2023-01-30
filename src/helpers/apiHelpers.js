const jsonwebtoken = require("jsonwebtoken");
const { User } = require("../db/userModel");
const { customError } = require("./errors");

const asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};

const errorHandler = (err, req, res, next) => {
  if (err instanceof customError) {
    return res.status(err.status).json({ message: err.message });
  }
  res.status(500).json({ message: err.message });
};

const createToken = async (user) => {
  const token = jsonwebtoken.sign(
    {
      _id: user._id,
      createdAt: user.createdAt,
    },
    process.env.JWT_SECRET
  );
  await User.findByIdAndUpdate(user?._id, { token });

  return token;
};

module.exports = { asyncWrapper, errorHandler, createToken };
