const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const petSchema = new mongoose.Schema(
  {
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
      maxLength: 16,
      default: null,
    },
    comments: {
      type: String,
      minLength: 8,
      maxLength: 120,
      default: null,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    avatarURL: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const Pet = mongoose.model("Pet", petSchema);

module.exports = { Pet };
