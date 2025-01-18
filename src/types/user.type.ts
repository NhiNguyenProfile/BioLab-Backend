import { ObjectId } from 'mongodb'

enum UserVerifyStatus {
  Unverified,
  Verified,
  Banned
}

interface UserType {
  id?: ObjectId
  fullname?: string
  email: string
  password: string
  created_at?: Date
  updated_at?: Date
  email_verify_token?: string
  forgot_password_token?: string
  verify?: UserVerifyStatus
}

export { UserVerifyStatus, UserType }
