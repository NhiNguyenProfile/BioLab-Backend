import { Collection, ObjectId } from 'mongodb'
import User from '~/models/schemas/user.schemas'
import databaseService from './database.service'
import { UserVerifyStatus } from '~/types/user.type'
import { hashPassword } from '~/utils/hashPassword'

class UserService {
  constructor() {}

  get users(): Collection<User> {
    return databaseService.getDb().collection(process.env.DB_USER_COLLECTION as string)
  }

  async createUser(user: User) {
    try {
      const existingUser = await this.users.findOne({ email: user.getEmail() })
      if (existingUser) {
        throw new Error('Email already exists')
      }

      const result = await this.users.insertOne(
        new User({
          id: new ObjectId(),
          fullname: user.getFullname(),
          email: user.getEmail(),
          password: hashPassword(user.getPassword()),
          created_at: new Date(Date.now()),
          verify: UserVerifyStatus.Unverified
        })
      )
      console.log('User created successfully:', result.insertedId)
      return result
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  }
}

const userService = new UserService()
export default userService
