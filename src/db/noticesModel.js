const { Schema, model } = require("mongoose");
const Joi = require("joi");

const handleSaveErrors = require("../helpers/handleSaveErrors");

const regexDate =
  /^((0?[1-9]|[12][0-9]|3[01])[- /.](0?[1-9]|1[012])[- /.](19|20)?[0-9]{2})*$/;
const locationRegExp =
  /^[A-ZА-ЯЁАЩЬЮЯҐЄІЇ][a-zA-Zа-яёА-ЯЁА-ЩЬЮЯҐЄІЇа-щьюяґєії\-]+,\s?[A-ZА-ЯЁАЩЬЮЯҐЄІЇ][a-zA-Zа-яёА-ЯЁА-ЩЬЮЯҐЄІЇа-щьюяґєії]+$/;

const noticesShema = new Schema(
  {
    categoryName: {
      type: String,
      enum: ["sell", "lost-found", "in-good-hands"],
      required: [true, "Notice type is required"],
    },

    title: {
      type: String,
      minLength: 2,
      maxLength: 48,
      required: [true, "Title is required"],
    },

    name: {
      type: String,
      minLength: 2,
      maxLength: 16,
      default: null,
    },

    birthday: {
      type: String,
      default: null,
    },

    breed: {
      type: String,
      minLength: 2,
      maxLength: 24,
      default: null,
    },

    sex: {
      type: String,
      enum: ["male", "female"],
      require: true,
    },

    location: {
      type: String,
      default: null,
    },

    price: {
      type: Number,
      default: null,
    },

    avatar: {
      type: String,
      default: null,
    },

    comments: {
      type: String,
      minLength: 8,
      maxLength: 120,
      required: [true, "Comments is required"],
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    email: {
      type: String,
      ref: "User",
    },
    phone: {
      type: String,
      ref: "User",
    },
  },
  { versionKey: false, timestamps: true }
);

noticesShema.post("save", handleSaveErrors);

const noticeAddValidateSchema = Joi.object({
  categoryName: Joi.string().valid("sell", "lost-found", "in-good-hands"),
  title: Joi.string(),
  name: Joi.string(),
  birthday: Joi.string().pattern(new RegExp(regexDate)),
  breed: Joi.string(),
  sex: Joi.string().valid("male", "female"),
  location: Joi.string(),
  price: Joi.number().integer().min(1),
  comments: Joi.string(),
});

const noticeValidateSchema = Joi.object({
  birthday: Joi.string().pattern(new RegExp(regexDate)),
  location: Joi.string().pattern(locationRegExp),
  price: Joi.number().min(1),
});

const schemas = {
  noticeValidateSchema,
  noticeAddValidateSchema,
};

const Notices = model("notices", noticesShema);

module.exports = {
  Notices,
  schemas,
};
