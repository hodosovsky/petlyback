const jsonwebtoken = require("jsonwebtoken");
const { notAuthorizedError } = require("../helpers/errors");
const { User } = require("../db/userModel");

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers["authorization"])
      next(
        new notAuthorizedError(
          "Please, provide a token in request authorization header"
        )
      );

    const [_, token] = req.headers["authorization"].split(" ");

    if (!token || !jsonwebtoken.decode(token, process.env.JWT_SECRET))
      next(new notAuthorizedError("Please, provide a token"));

    const user = jsonwebtoken.decode(token, process.env.JWT_SECRET);
    const findedUser = await User.findById(user._id);

    if (!findedUser) next(new notAuthorizedError("Not authorized"));

    if (token !== findedUser.token)
      next(new notAuthorizedError("Not authorized"));
    req.token = token;
    req.user = findedUser;
    next();
  } catch (error) {
    next(new notAuthorizedError("Not authorized"));
  }
};

module.exports = { authMiddleware };
