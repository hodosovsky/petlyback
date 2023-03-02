const Joi = require("joi");
const { ValidationError } = require("../helpers/errors");

module.exports = {
  addContactsValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(1).max(30).required(),
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

  petValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(1),
      birthday: Joi.string(),
      breed: Joi.string(),
      comments: Joi.string(),
      avatarURL: Joi.string(),
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
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .min(10)
        .max(63)
        .required(),
      password: Joi.string().min(7).max(32).required(),
      name: Joi.string().min(1).max(16).required(),
      phone: Joi.string()
        .pattern(new RegExp(/^\+?3?8?(0\d{9})$/))
        .required(),
      city: Joi.string().required(),
    });
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      // return res.status(400).json({ message: "missing fields" });
      next(new ValidationError(JSON.stringify(validationResult.error.message)));
    }
    next();
  },

  userLoginValidation: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(7).max(32).required(),
    });
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      // return res.status(400).json({ message: "missing fields" });
      next(new ValidationError(JSON.stringify(validationResult.error.message)));
    }
    next();
  },

  changeUserValidation: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .min(10)
        .max(63),
      password: Joi.string().min(7).max(32),
      name: Joi.string().min(1),
      phone: Joi.string(),
      city: Joi.string(),
      birthday: Joi.string(),
    });
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      // return res.status(400).json({ message: "missing fields" });
      next(new ValidationError(JSON.stringify(validationResult.error.message)));
    }
    next();
  },
};
