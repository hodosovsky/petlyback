const {
  getNoticesByUserService,
} = require('../../services/notices/getNoticesByUserService')

const getNoticesByUserController = async (req, res) => {
  const { _id } = req.user
  const { search } = req.query

  const data = await getNoticesByUserService(_id, search)
  res.json(data)
}

module.exports = { getNoticesByUserController }
