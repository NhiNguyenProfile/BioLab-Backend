import { Router } from 'express'
import { loginController, registerController } from '~/controller/user.controller'
import { loginValidator, registerValidator } from '~/middlewares/user.middleware'

const userRouter = Router()

userRouter.post('/login', loginValidator, loginController)

userRouter.post('/register', registerValidator, registerController)

export default userRouter
