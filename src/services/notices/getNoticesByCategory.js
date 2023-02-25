const { Notices } = require('../../db/noticesModel')
const { ValidationError } = require('../../helpers/errors')

const getNoticesByCategoryService = async (category) => {
  if (!['sell', 'lost-found', 'in-good-hands'].includes(category)) {
    throw new ValidationError(404, 'Not found')
  }
  const data = await Notices.find({ categoryName: category })
  return data
}

module.exports = { getNoticesByCategoryService }
