const {
  getNoticesByUserService,
} = require('../../services/notices/getNoticesByUserService')

const getNoticesByUserController = async (req, res) => {
  const { _id } = req.user
  const data = await getNoticesByUserService(_id)
  res.json({ message: data })
}

module.exports = { getNoticesByUserController }
