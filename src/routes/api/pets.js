const express = require('express')
const { asyncWrapper } = require('../../helpers/apiHelpers')
const { authMiddleware } = require('../../middlewares/authMiddleware')
const { addPetController } = require('../../controllers/pets/addPet')
const { deletePetController } = require('../../controllers/pets/deletePet')
const { patchPetController } = require('../../controllers/pets/changePet')
const {
  patchNoticeAvatarController,
} = require('../../controllers/notices/patchNoticeAvatar')
const { uploadMiddleware } = require('../../helpers/multerConfig')
const { validatinFileType } = require('../../middlewares/validatinFileType')
const { petValidation } = require('../../middlewares/middlewares')
const router = express.Router()

router.post(
  '/',
  authMiddleware,
  uploadMiddleware.single('avatar'),
  validatinFileType,
  asyncWrapper(addPetController)
)
router.delete('/:petId', authMiddleware, asyncWrapper(deletePetController))
router.patch(
  '/:petId',
  authMiddleware,
  petValidation,
  asyncWrapper(patchPetController)
)
router.patch(
  '/avatars/:petId',
  authMiddleware,
  uploadMiddleware.single('avatar'),
  validatinFileType,
  asyncWrapper(patchNoticeAvatarController)
)
module.exports = router
