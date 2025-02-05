import { NextFunction, Request, Response } from 'express'
import { HttpMessage, HttpStatus } from '~/constants/status'
import { RegisterReqBody } from '~/models/requets/user.request'
import User from '~/models/schemas/user.schema'
import userService from '~/services/user.service'

const loginController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body
    res.status(HttpStatus.BAD_REQUEST).json({
      error: 'Login failed!'
    })
  } catch (error) {
    next(error)
  }
}

const registerController = async (
  req: Request<Record<string, string>, any, RegisterReqBody>,
  res: Response
): Promise<void> => {
  try {
    const user = await userService.createUser(req.body)

    res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      error: 'Register successfully!',
      data: user,
      msg: HttpMessage[HttpStatus.CREATED]
    })
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      error: 'Register failed!',
      msg: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export { loginController, registerController }
