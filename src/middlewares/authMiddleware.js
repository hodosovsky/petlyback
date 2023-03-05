const jsonwebtoken = require("jsonwebtoken");
const { NotAuthorizedError } = require("../helpers/errors");
const { User } = require("../db/userModel");

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      next(
        new NotAuthorizedError(
          "Please, provide a token in request authorization header"
        )
      );

    const [, token] = req.headers.authorization.split(" ");

    if (!token || !jsonwebtoken.verify(token, process.env.JWT_SECRET))
      next(new NotAuthorizedError("Please, provide a token"));

    const user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    const findedUser = await User.findById(user._id);

    if (!findedUser) next(new NotAuthorizedError("Not authorized"));

    if (token !== findedUser.token)
      next(new NotAuthorizedError("Not authorized"));

    req.token = token;
    req.user = findedUser;

    next();
  } catch (error) {
    next(new NotAuthorizedError("Not authorized"));
  }
};

module.exports = { authMiddleware };
