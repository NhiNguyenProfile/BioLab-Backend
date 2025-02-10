import { Collection, ObjectId } from 'mongodb'
import User from '~/models/schemas/user.schema'
import databaseService from './database.service'
import { TokenType, UserRole, UserVerifyStatus } from '~/types/user.type'
import { hashPassword } from '~/utils/crypto'
import { RegisterReqBody, UpdateUserReqBody } from '~/models/requets/user.request'
import { signToken } from '~/utils/jwt'

class UserService {
  private readonly ACCESS_TOKEN_EXP = '15m'
  private readonly REFRESH_TOKEN_EXP = '100d'

  constructor() {}

  get users(): Collection<User> {
    return databaseService.getDb().collection(process.env.DB_USER_COLLECTION as string)
  }

  private async signAccessToken(user_id: string) {
    return signToken({
      payload: { user_id, token_type: TokenType.AccessToken },
      options: {
        expiresIn: this.ACCESS_TOKEN_EXP
      }
    })
  }

  private async signRefreshToken(user_id: string) {
    return signToken({
      payload: { user_id, token_type: TokenType.RefreshToken },
      options: {
        expiresIn: this.REFRESH_TOKEN_EXP
      }
    })
  }

  private async signAccessAndRefreshToken(userId: string) {
    return await Promise.all([this.signAccessToken(userId), this.signRefreshToken(userId)])
  }

  async createUser(payload: RegisterReqBody) {
    try {
      const { confirm_password, password, ...userData } = payload
      if (confirm_password !== password) {
        throw new Error('Invalid confirm password!')
      }

      const initUser = new User({
        _id: new ObjectId(),
        password: hashPassword(password),
        ...userData,
        created_at: new Date(),
        updated_at: new Date(),
        verify: UserVerifyStatus.Unverified,
        role: UserRole.Customer
      })

      const result = await this.users.insertOne(initUser)
      const userId = result.insertedId.toString()

      const [accessToken, refreshToken] = await this.signAccessAndRefreshToken(userId)
      console.log('User created successfully:', userId)
      return {
        access_token: accessToken,
        refresh_token: refreshToken
      }
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  }

  async login(userId: string) {
    const [accessToken, refreshToken] = await this.signAccessAndRefreshToken(userId)
  }

  async checkEmailExist(email: string) {
    const existingUser = await this.users.findOne({ email: email })
    return existingUser
  }

  async getUserById(userId: string) {
    if (!ObjectId.isValid(userId)) throw new Error('Invalid user ID format')

    try {
      const user = await this.users.findOne({ id: new ObjectId(userId) }, { projection: { password: 0 } })
      if (!user) throw new Error('User not found!')
      return user
    } catch (error) {
      console.error('Error getting user by ID:', error)
      throw error
    }
  }

  async updateUser(userId: string, updateData: UpdateUserReqBody) {
    if (!ObjectId.isValid(userId)) throw new Error('Invalid user ID format')

    try {
      const result = await this.users.findOneAndUpdate(
        { id: new ObjectId(userId) },
        { $set: updateData },
        { returnDocument: 'after', projection: { password: 0 } }
      )
      if (!result) throw new Error('User not found or update failed!')
      return result
    } catch (error) {
      console.error('Error updating user:', error)
      throw error
    }
  }

  async deleteUser(userId: string) {
    if (!ObjectId.isValid(userId)) throw new Error('Invalid user ID format')

    try {
      const result = await this.users.deleteOne({ id: new ObjectId(userId) })
      if (result.deletedCount === 0) throw new Error('User not found or already deleted!')
      return { message: 'User deleted successfully' }
    } catch (error) {
      console.error('Error deleting user:', error)
      throw error
    }
  }

  async getAllUsers(page: number = 1, limit: number = 10) {
    try {
      const skip = (page - 1) * limit
      const users = await this.users
        .find({}, { projection: { password: 0 } })
        .skip(skip)
        .limit(limit)
        .toArray()

      const total = await this.users.countDocuments()
      return {
        data: users,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      }
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error
    }
  }
}

const userService = new UserService()
export default userService
