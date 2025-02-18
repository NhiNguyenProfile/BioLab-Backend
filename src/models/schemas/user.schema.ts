import { ObjectId } from 'mongodb'
import { UserRole, UserType, UserVerifyStatus } from '~/types/user.type'

export default class User {
  _id: ObjectId
  fullname: string
  email: string
  phone: string
  password: string
  created_at?: Date
  updated_at?: Date
  email_verify_token?: string
  forgot_password_token?: string
  verify: UserVerifyStatus
  role: UserRole

  constructor(user: UserType) {
    this._id = user._id
    this.fullname = user.fullname
    this.email = user.email
    this.phone = user.phone
    this.password = user.password
    this.created_at = user.created_at
    this.updated_at = user.updated_at
    this.email_verify_token = user.email_verify_token
    this.forgot_password_token = user.forgot_password_token
    this.verify = user.verify
    this.role = user.role
  }
}
