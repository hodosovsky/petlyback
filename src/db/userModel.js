const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      unique: true,
    },
    birthday: {
      type: mongoose.Schema.Types.Date,
      required: true,
      default: Date.now(),
    },
    city: {
      type: String,
      required: [true, 'City is required'],
    },
    favorites: {
      type: mongoose.Schema.Types.Array,
      default: [],
    },
    userPets: {
      type: mongoose.Schema.Types.Array,
      default: [],
    },
    token: String,
    avatarURL: String,
  },
  { versionKey: false, timestamps: true }
)

userSchema.pre('save', async function () {
  if (this.isNew) this.password = await bcrypt.hash(this.password, 10)
})

const User = mongoose.model('User', userSchema)

module.exports = { User }
