const jsonwebtoken = require("jsonwebtoken");
const { notAuthorizedError } = require("../helpers/errors");
const { User } = require("../db/userModel");

const authMiddleware = async (req, res, next) => {
  const [tokenType, token] = req.headers["authorization"].split(" ");

  if (!token || !jsonwebtoken.decode(token, process.env.JWT_SECRET))
    next(new notAuthorizedError("Not authorized"));

  try {
    const user = jsonwebtoken.decode(token, process.env.JWT_SECRET);
    const findedUser = await User.findById(user._id);

    if (token !== findedUser.token)
      next(new notAuthorizedError("Not authorized"));
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    next(new notAuthorizedError("Not authorized"));
  }
};

module.exports = { authMiddleware };
