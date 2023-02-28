const { Notices } = require('../../db/noticesModel')
const { User } = require('../../db/userModel')
const { WrongParametersError } = require('../../helpers/errors')

const deleteNoticeService = async (owner, id) => {
  const notice = await Notices.findById(id)
  if (notice.owner.equals(owner)) {
    const data = await Notices.findByIdAndDelete(id)
    await User.updateMany({}, { $pull: { favorites: id } })

    return data
  } else {
    throw new WrongParametersError('Not authorised to delete')
  }
}

module.exports = { deleteNoticeService }
