const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
    },
    birthday: {
      type: String,
      default: null,
    },
    breed: {
      type: String,
      default: null,
    },
    comments: {
      type: String,
      default: null,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "pet",
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
