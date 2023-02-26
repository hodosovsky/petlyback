const { Notices } = require('../../db/noticesModel')

const getAllCategoriesService = async () => {
  const data = await Notices.find({}).select(['-createdAt', '-updatedAt'])
  return data
}

module.exports = {
  getAllCategoriesService,
}
