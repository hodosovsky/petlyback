const Joi = require("joi");
const { ValidationError } = require("../helpers/errors");

module.exports = {
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
      next(new ValidationError(validationResult.error.message));
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
        .pattern(/^\+?3?8?(0\d{9})$/)
        .required(),
      city: Joi.string().required(),
    });
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
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
      next(new ValidationError(JSON.stringify(validationResult.error.message)));
    }

    next();
  },

  userEmailChangeValidation: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(7).max(32).required(),
    });
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
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
      next(new ValidationError(JSON.stringify(validationResult.error.message)));
    }

    next();
  },
};
