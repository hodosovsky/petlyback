const {
  getAllCategoriesService,
} = require('../../services/notices/getAllCategories')

const getAllCategoriesController = async (req, res) => {
  const data = await getAllCategoriesService()
  res.json(data)
}

module.exports = { getAllCategoriesController }
