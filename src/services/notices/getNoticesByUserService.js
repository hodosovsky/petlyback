const { Notices } = require('../../db/noticesModel')

const getNoticesByUserService = async (id, search) => {
  if (search) {
    const data = await Notices.find({
      title: { $regex: search, $options: 'i' },
    })
      .sort({ date: -1 })
      .select(['-createdAt', '-updatedAt'])
    return data
  }

  const data = await Notices.find({ owner: id }).select([
    '-createdAt',
    '-updatedAt',
  ])

  return data
}

module.exports = { getNoticesByUserService }
