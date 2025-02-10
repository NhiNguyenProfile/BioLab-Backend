import { Request } from 'express'
import { UserType } from './user.type'

declare module 'express' {
  interface Request {
    user?: UserType
  }
}
