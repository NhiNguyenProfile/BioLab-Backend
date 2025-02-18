import { Router } from 'express'
import {
  loginController,
  logoutController,
  refreshTokenController,
  registerController
} from '~/controller/user.controller'
import {
  accessTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/user.middleware'
import { wrapAsync } from '~/utils/handler'

const userRouter = Router()

/**
 * Description. Login a user
 * Path: /login
 * Method: POST
 * Body: { email: string, password: string }
 */
userRouter.post('/login', loginValidator, wrapAsync(loginController))

/**
 * Description. Register a user
 * Path: /register
 * Method: POST
 * Body: { email: string, password: string, confirm_password: string, fullname: string }
 */
userRouter.post('/register', registerValidator, wrapAsync(registerController))

/**
 * Description. Logout a user
 * Path: /logout
 * Method: POST
 * Headers: { access_token: string }
 * Body: { refresh_token: string }
 */
userRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapAsync(logoutController))

/**
 * Description. Refresh Token
 * Path: /refresh-token
 * Method: POST
 * Body: { refresh_token: string }
 */
userRouter.post('/refresh-token', refreshTokenValidator, wrapAsync(refreshTokenController))

export default userRouter
