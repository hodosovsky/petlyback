const { changeEmailService } = require('../../services/user/changeEmailService')

const changeEmailController = async (req, res) => {
  const { _id } = req.user
  const { email, password } = req.body
  const updatedUser = await changeEmailService(email, password, _id)
  res.json({ message: updatedUser })
}

module.exports = {
  changeEmailController,
}
