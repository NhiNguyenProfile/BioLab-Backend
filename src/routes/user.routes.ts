import { Router } from 'express'
import { loginController, registerController, userController } from '~/controller/user.controller'
import { loginValidator, registerValidator } from '~/middlewares/user.middleware'
import { wrapAsync } from '~/utils/handler'

const userRouter = Router()

userRouter.post('/login', loginValidator, loginController)

userRouter.post('/register', registerValidator, wrapAsync(registerController))

userRouter.get('/users/:id', userController.getUserById)

userRouter.get('/users', userController.getAllUsers)

userRouter.put('/users/:id', userController.updateUser)

userRouter.delete('/users/:id', userController.deleteUser)

export default userRouter
