const { Notices } = require('../../db/noticesModel')

const getNoticesByUserService = async (id) => {
  const data = await Notices.find({ owner: id })

  if (!data.length) {
    return null
  }

  return data
}

module.exports = { getNoticesByUserService }
