const Joi = require("joi");
const { ValidationError } = require("../helpers/errors");

// const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regexEmail =
  /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/;
const regexName = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const regexDate =
  /^((0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.](19|20)?[0-9]{2})*$/;
const locationRegExp =
  /^[A-ZА-ЯЁАЩЬЮЯҐЄІЇ][a-zA-Zа-яёА-ЯЁА-ЩЬЮЯҐЄІЇа-щьюяґєії\-]+,\s?[A-ZА-ЯЁАЩЬЮЯҐЄІЇ][a-zA-Zа-яёА-ЯЁА-ЩЬЮЯҐЄІЇа-щьюяґєії]+$/;

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
        .pattern(new RegExp(regexEmail))
        .min(10)
        .max(63),
      password: Joi.string().alphanum().min(7).max(32),
      name: Joi.string().min(1).max(16).pattern(new RegExp(regexName)),
      phone: Joi.string(),
      city: Joi.string().pattern(new RegExp(locationRegExp)),
      birthday: Joi.string().pattern(new RegExp(regexDate)),
    });
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      next(new ValidationError(JSON.stringify(validationResult.error.message)));
    }

    next();
  },
};
