import { Request, Response, NextFunction } from 'express'
import jwt, { TokenExpiredError } from 'jsonwebtoken'
import { HttpStatus } from '~/constants/status'

const SECRET_KEY = process.env.JWT_SECRET || ''

interface ProtectedRequest extends Request {
  userId?: string
}

interface DecodedToken {
  userId: string
  exp: number
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1]
    if (!token) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized' })
    }

    const decoded = jwt.verify(token, SECRET_KEY) as DecodedToken

    if (decoded.exp * 1000 < Date.now()) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Token expired' })
    }

    // Gán userId vào request
    ;(req as ProtectedRequest).userId = decoded.userId

    next()
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Token expired' })
    }

    return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid token' })
  }
}

export default authMiddleware
