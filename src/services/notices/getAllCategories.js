const { Notices } = require('../../db/noticesModel')

const getAllCategoriesService = async (search) => {
  if (search) {
    const data = await Notices.find({
      title: { $regex: search, $options: 'i' },
    })
      .sort({ date: -1 })
      .select(['-createdAt', '-updatedAt'])
    return data
  }

  const data = await Notices.find({}).select(['-createdAt', '-updatedAt'])
  return data
}

module.exports = {
  getAllCategoriesService,
}
