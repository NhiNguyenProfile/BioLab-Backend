import { Request } from 'express'
import { UserType } from './user.type'

interface DecodedToken {
  user_id: string
  role: string
  iat: number
  exp: number
}

declare module 'express' {
  interface Request {
    user?: UserType
    decoded_authorization?: DecodedToken
  }
}
