const { Notices } = require('../../db/noticesModel')
const { petPhotoUpload } = require('../../helpers/petPhotoUpload')

const patchNoticeAvatarService = async (file, id, owner) => {
  let newUrl = null

  if (file) {
    const { path, fieldname } = file
    const { url } = await petPhotoUpload(path, fieldname, owner)
    newUrl = url
  }

  const updatedPet = await Notices.findOneAndUpdate(
    { _id: id },
    {
      avatar: newUrl,
    },
    {
      new: true,
    }
  ).select(['-createdAt', '-updatedAt'])

  return updatedPet
}

module.exports = {
  patchNoticeAvatarService,
}
