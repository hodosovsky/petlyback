const { getAllNewsService } = require('../../services/news/getAllNewsService')

const getAllNews = async (req, res, next) => {
  const { search } = req.query

  const data = await getAllNewsService(search)
  res.json(data)
}

module.exports = getAllNews
