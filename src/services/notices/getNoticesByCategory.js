const { Notices } = require('../../db/noticesModel')
const { WrongParametersError } = require('../../helpers/errors')

const getNoticesByCategoryService = async (category) => {
  if (['sell', 'lost-found', 'in-good-hands'].includes(category)) {
    const data = await Notices.find({ categoryName: category })
    return data
  }

  const data = await Notices.findById(category)
  if (!data) throw new WrongParametersError('Not found')
  return data
}

module.exports = { getNoticesByCategoryService }
