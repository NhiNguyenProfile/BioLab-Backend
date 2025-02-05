import { ObjectId } from 'mongodb'

enum UserVerifyStatus {
  Unverified,
  Verified,
  Banned
}

enum UserRole {
  Customer,
  Admin
}

interface UserType {
  id: ObjectId
  fullname: string
  email: string
  password: string
  created_at: Date
  updated_at?: Date
  email_verify_token?: string
  forgot_password_token?: string
  verify: UserVerifyStatus
  role: UserRole
}

enum TokenType {
  AccessToken,
  RefreshToken,
  ForgotPasswordToken,
  EmailVerifyToken
}

export { UserVerifyStatus, UserType, UserRole, TokenType }
