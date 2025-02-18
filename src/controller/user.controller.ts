import { NextFunction, Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { HttpMessage, HttpStatus } from '~/constants/status'
import { RegisterReqBody, UpdateUserReqBody } from '~/models/requets/user.request'
import userService from '~/services/user.service'
import { DecodedToken } from '~/types/type'
import { UserType } from '~/types/user.type'
import { decodeToken } from '~/utils/jwt'

const loginController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const user = req.user as UserType
  const userId = user._id as ObjectId
  const role = user.role
  const result = await userService.login(userId.toString(), role.toString())
  res.status(HttpStatus.OK).json({
    status: HttpStatus.OK,
    data: result,
    msg: HttpMessage[HttpStatus.OK]
  })
  return
}

const logoutController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const refreshToken = req.body.refresh_token
  const result = await decodeToken(refreshToken).then((decoded) => userService.logout(decoded?.user_id))
  res.status(HttpStatus.OK).json({
    status: HttpStatus.OK,
    data: result,
    msg: HttpMessage[HttpStatus.OK]
  })
  return
}

const registerController = async (
  req: Request<Record<string, string>, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const user = await userService.createUser(req.body)

  res.status(HttpStatus.CREATED).json({
    status: HttpStatus.CREATED,
    data: user,
    msg: HttpMessage[HttpStatus.CREATED]
  })
  return
}

const refreshTokenController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { user_id, role } = req.decoded_authorization as DecodedToken
  const result = await userService.refreshToken(user_id.toString(), role.toString())
  res.status(HttpStatus.OK).json({
    status: HttpStatus.OK,
    data: result,
    msg: HttpMessage[HttpStatus.OK]
  })
  return
}

class UserController {
  async getUserById(req: Request, res: Response, next: NextFunction) {
    const user = await userService.getUserById(req.params.id)
    if (!user) {
      res.status(HttpStatus.NOT_FOUND).json({ status: HttpStatus.NOT_FOUND, message: 'User not found' })
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const result = await userService.getAllUsers(page, limit)
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK, data: result })
  }

  async deleteUser(req: Request, res: Response) {
    const deleted = await userService.deleteUser(req.params.id)
    if (!deleted) {
      res.status(HttpStatus.NOT_FOUND).json({ status: HttpStatus.NOT_FOUND, message: 'User not found' })
    }
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK, message: 'User deleted successfully' })
  }
}

const userController = new UserController()

export { loginController, registerController, userController, logoutController, refreshTokenController }
