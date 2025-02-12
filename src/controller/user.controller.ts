import { NextFunction, Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { HttpMessage, HttpStatus } from '~/constants/status'
import { RegisterReqBody, UpdateUserReqBody } from '~/models/requets/user.request'
import userService from '~/services/user.service'
import { UserType } from '~/types/user.type'
import { decodeToken } from '~/utils/jwt'

const loginController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const user = req.user as UserType
  const userId = user._id as ObjectId
  const result = await userService.login(userId.toString())
  res.status(HttpStatus.OK).json({
    status: HttpStatus.OK,
    error: 'Login successfully!',
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
    error: 'Logout successfully!',
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
    error: 'Register successfully!',
    data: user,
    msg: HttpMessage[HttpStatus.CREATED]
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

  async updateUser(req: Request<Record<string, string>, any, UpdateUserReqBody>, res: Response) {
    const userId = ''
    // if (!userId) {
    //   res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' })
    //   return
    // }

    const updatedUser = await userService.updateUser(userId, req.body)

    if (!updatedUser) {
      res.status(HttpStatus.NOT_FOUND).json({ status: HttpStatus.NOT_FOUND, message: 'User not found' })
    }

    res.status(HttpStatus.OK).json({ status: HttpStatus.OK, message: 'User updated successfully', data: updatedUser })
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

export { loginController, registerController, userController, logoutController }
