const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { string } = require("joi");

const userSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
    },
    birthday: {
      type: mongoose.Schema.Types.Date,
      required: true,
      default: Date.now(),
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    avatarURL: {
      type: String,
      default: null,
    },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "notice" }],
    userPets: [{ type: mongoose.Schema.Types.ObjectId, ref: "userPet" }],
    token: {
      type: String,
      default: null,
  },
},
  { versionKey: false, timestamps: true }
);

userSchema.pre("save", async function () {
  if (this.isNew) this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
