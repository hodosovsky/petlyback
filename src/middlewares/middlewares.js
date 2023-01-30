const Joi = require("joi");
const { ValidationError } = require("../helpers/errors");

module.exports = {
  addContactsValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      phone: Joi.number().integer().required(),
      favorite: Joi.boolean(),
    });
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      // return res.status(400).json({ message: "missing fields" });
      next(new ValidationError(validationResult.error.message));
    }
    next();
  },

  patchContactsValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      phone: Joi.number().integer(),
      favorite: Joi.boolean(),
    });
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      // return res.status(400).json({ message: "missing fields" });
      next(new ValidationError(validationResult.error.message));
    }
    next();
  },

  patchFavoriteContactsValidation: (req, res, next) => {
    const schema = Joi.object({
      favorite: Joi.boolean().required(),
    });
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      // return res.status(400).json({ message: "missing fields" });
      next(new ValidationError(JSON.stringify(validationResult.error.message)));
    }
    next();
  },

  userAuthValidation: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(4).required(),
    });
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      // return res.status(400).json({ message: "missing fields" });
      next(new ValidationError(JSON.stringify(validationResult.error.message)));
    }
    next();
  },

  changeSubscriptionValidation: (req, res, next) => {
    const schema = Joi.object({
      subscription: Joi.string().required().valid("starter", "pro", "business"),
    });
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      // return res.status(400).json({ message: "missing fields" });
      next(new ValidationError(JSON.stringify(validationResult.error.message)));
    }
    next();
  },
};
