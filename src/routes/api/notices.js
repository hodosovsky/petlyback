const express = require('express')

const {
  getNoticesByCategoryController,
} = require('../../controllers/notices/getNoticesByCategory')
const {
  getAllCategoriesController,
} = require('../../controllers/notices/getAllCategories')

const { schemas } = require('./../../db/noticesModel')

const {
  addContactsValidation,
  patchContactsValidation,
  patchFavoriteContactsValidation,
} = require('../../middlewares/middlewares')

const { authMiddleware } = require('../../middlewares/authMiddleware')

const { asyncWrapper } = require('../../helpers/apiHelpers')

const router = express.Router()
// router.use(authMiddleware)

router.get(
  '/',
  // schemas.noticeValidateSchema,
  asyncWrapper(getAllCategoriesController)
)
router.get('/:noticesId', asyncWrapper(getNoticesByCategoryController))

module.exports = router
