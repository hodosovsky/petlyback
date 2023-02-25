const { News } = require('../../db/newsModel')

const getAllNewsService = async (search) => {
  if (search) {
    const data = await News.find({ title: { $regex: search, $options: 'i' } })
    return data
  }

  const data = await News.find({})
  return data
}

module.exports = { getAllNewsService }
