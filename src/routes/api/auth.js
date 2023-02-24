const express = require('express')

const { registrationController } = require('../../controllers/auth/register')
const { loginController } = require('../../controllers/auth/login')
const { logoutController } = require('../../controllers/auth/logout')
const { currentUserController } = require('../../controllers/auth/current')
const {
  changeAvatarController,
} = require('../../controllers/auth/changeAvatar')
const { googleAuthController } = require('../../controllers/auth/googleAuth')
const { asyncWrapper } = require('../../helpers/apiHelpers')

const {
  userAuthValidation,
  userLoginValidation,
} = require('../../middlewares/middlewares')
const { authMiddleware } = require('../../middlewares/authMiddleware')
const { uploadMiddleware } = require('../../helpers/multerConfig')
const passport = require('../../middlewares/googleAuth')
const router = express.Router()

router.post(
  '/register',
  userAuthValidation,
  asyncWrapper(registrationController)
)
router.post('/login', userLoginValidation, asyncWrapper(loginController))
router.post('/logout', authMiddleware, asyncWrapper(logoutController))
router.get('/current', authMiddleware, asyncWrapper(currentUserController))
// router.patch(
//   "/",
//   authMiddleware,
//   changeSubscriptionValidation,
//   asyncWrapper(changeSubscriptionController)
// );
router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
)
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  googleAuthController
)
router.patch(
  '/avatars',
  authMiddleware,
  uploadMiddleware.single('avatar'),

  asyncWrapper(changeAvatarController)
)

module.exports = router
