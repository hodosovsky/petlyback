const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const { User } = require('../../db/userModel')
const { login } = require('../auth/login')
const {
  NotAuthorizedError,
  EmailConflictError,
  ValidationError,
} = require('../../helpers/errors')
const { createToken } = require('../../helpers/apiHelpers')
const gravatar = require('gravatar')
const path = require('path')
const fs = require('fs').promises
const Jimp = require('jimp')

const registration = async ({ name, email, password, phone, city }) => {
  const findByEmail = await User.findOne({ email })
  const findByPhone = await User.findOne({ phone })

  if (findByEmail) throw new EmailConflictError(`Email ${email} in use`)
  if (findByPhone) throw new EmailConflictError(`Phone ${phone} in use`)

  const avatarURL = gravatar.url(
    email,
    { s: '250', r: 'x', d: 'robohash' },
    true
  )

  const user = new User({
    name,
    email,
    password,
    avatarURL,
    phone,
    city,
  })

  await user.save()
  const loginObj = { email, password }
  const { token, user: loginedUser } = await login(loginObj)

  return { token, loginedUser }
}

module.exports = { registration }
