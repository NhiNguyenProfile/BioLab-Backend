import { Router } from 'express'

const userRouter = Router()

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now())
  next()
}

userRouter.use(timeLog)

export default userRouter
