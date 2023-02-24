const { FRONTEND_URL } = process.env
const { createToken } = require('../../helpers/apiHelpers')

const googleAuthController = async (req, res) => {
  const token = await createToken(req.user)

  res.redirect(`${FRONTEND_URL}?token=${token}`)
}

module.exports = { googleAuthController }
