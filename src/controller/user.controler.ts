import { NextFunction, Request, Response } from 'express'
import User from '~/models/schemas/user.schemas'
import userService from '~/services/user.service'

const loginController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body
    res.status(400).json({
      error: 'Login failed'
    })
  } catch (error) {
    next(error)
  }
}

const registerController = (req: Request, res: Response) => {
  const { fullname, email, password } = req.body

  userService.createUser(
    new User({
      fullname: fullname,
      email: email,
      password: password
    })
  )

  return res.status(400).json({
    error: 'Login failed'
  })
}

export { loginController, registerController }
