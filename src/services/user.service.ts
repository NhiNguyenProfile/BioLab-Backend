import { Collection, ObjectId } from 'mongodb'
import User from '~/models/schemas/user.schema'
import databaseService from './database.service'
import { UserRole, UserVerifyStatus } from '~/types/user.type'
import { hashPassword } from '~/utils/crypto'
import { RegisterReqBody } from '~/models/requets/user.request'
import { signToken } from '~/utils/jwt'

class UserService {
  constructor() {}

  get users(): Collection<User> {
    return databaseService.getDb().collection(process.env.DB_USER_COLLECTION as string)
  }

  private async signAccessToken(userId: string) {
    return signToken({
      payload: userId
    })
  }

  async createUser(payload: RegisterReqBody) {
    try {
      const existingUser = await this.users.findOne({ email: payload.email })
      if (existingUser) {
        throw new Error('Email already exists!')
      }
      const { confirm_password, password, ...userData } = payload
      if (confirm_password !== password) {
        throw new Error('Invalid confirm password!')
      }

      const initUser = new User({
        id: new ObjectId(),
        password: hashPassword(password),
        ...userData,
        created_at: new Date(Date.now()),
        verify: UserVerifyStatus.Unverified,
        role: UserRole.Customer
      })

      const result = await this.users.insertOne(initUser)
      console.log('User created successfully:', result.insertedId)
      return initUser
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  }
}

const userService = new UserService()
export default userService
