const jsonwebtoken = require("jsonwebtoken");
const { notAuthorizedError } = require("../helpers/errors");

const authMiddleware = (req, res, next) => {
  const [tokenType, token] = req.headers["authorization"].split(" ");

  if (!token || !jsonwebtoken.decode(token, process.env.JWT_SECRET))
    next(new notAuthorizedError("Not authorized"));

  try {
    const user = jsonwebtoken.decode(token, process.env.JWT_SECRET);
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    next(new notAuthorizedError("Not authorized"));
  }
};

module.exports = { authMiddleware };
