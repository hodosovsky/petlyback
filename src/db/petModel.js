const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    birthday: {
      type: String,
    },
    breed: {
      type: String,
    },
    comments: {
      type: String,
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
