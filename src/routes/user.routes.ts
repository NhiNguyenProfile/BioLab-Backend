import { Router } from 'express'
import { loginController } from '~/controller/user.controler'
import { loginValidator } from '~/middlewares/user.middleware'

const userRouter = Router()

userRouter.post('/login', loginValidator, loginController)

export default userRouter
