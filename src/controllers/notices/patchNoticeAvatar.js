const {
  patchNoticeAvatarService,
} = require('../../services/notices/patchNoticeAvatarService')

const patchNoticeAvatarController = async (req, res) => {
  const { noticesId } = req.params
  const { _id: ownerId } = req.user

  const data = await patchNoticeAvatarService(req.file, noticesId, ownerId)

  res.status(200).json(data)
}

module.exports = { patchNoticeAvatarController }
