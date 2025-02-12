import { Router } from 'express'
import { loginController, logoutController, registerController, userController } from '~/controller/user.controller'
import { loginValidator, logoutValidator, registerValidator } from '~/middlewares/user.middleware'
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
userRouter.post('/logout', logoutValidator, wrapAsync(logoutController))

// userRouter.get('/users/:id', userController.getUserById)

// userRouter.get('/users', userController.getAllUsers)

// userRouter.put('/users/:id', userController.updateUser)

// userRouter.delete('/users/:id', userController.deleteUser)

export default userRouter
