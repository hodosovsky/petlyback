const { ValidationError } = require("../helpers/errors");

const validationBody = (schema) => {
  const func = async (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(new ValidationError(error.message));
    }
    next();
  };
  return func;
};

module.exports = { validationBody };
