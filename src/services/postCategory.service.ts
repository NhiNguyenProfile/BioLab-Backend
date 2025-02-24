import { ObjectId } from 'mongodb'
import databaseService from './database.service'
import { PostCategoryType } from '~/types/postCategory.type'
import { CreatePostCategoryReqBody, UpdatePostCategoryReqBody } from '~/models/requets/postCategory.request'

class PostCategoryService {
  constructor() {}

  async createPostCategory(payload: CreatePostCategoryReqBody) {
    const newPostCategory: PostCategoryType = {
      _id: new ObjectId(),
      post_category_name: payload.post_category_name
    }

    const result = await databaseService.postCategories.insertOne(newPostCategory)
    return {
      category_id: result.insertedId,
      message: 'PostCategory created successfully'
    }
  }

  async getPostCategoryById(categoryId: string) {
    if (!ObjectId.isValid(categoryId)) throw new Error('Invalid category ID format')

    const category = await databaseService.postCategories.findOne({ _id: new ObjectId(categoryId) })
    if (!category) throw new Error('PostCategory not found!')
    return category
  }

  async updatePostCategory(categoryId: string, updateData: Partial<UpdatePostCategoryReqBody>) {
    if (!ObjectId.isValid(categoryId)) throw new Error('Invalid category ID format')

    const result = await databaseService.postCategories.findOneAndUpdate(
      { _id: new ObjectId(categoryId) },
      { $set: updateData },
      { returnDocument: 'after' }
    )
    if (!result) throw new Error('PostCategory not found or update failed!')
    return result
  }

  async deletePostCategory(categoryId: string) {
    if (!ObjectId.isValid(categoryId)) throw new Error('Invalid category ID format')

    const result = await databaseService.postCategories.deleteOne({ _id: new ObjectId(categoryId) })
    if (result.deletedCount === 0) throw new Error('PostCategory not found or already deleted!')
    return { message: 'PostCategory deleted successfully' }
  }

  async getAllCategories() {
    return await databaseService.postCategories.find({}).toArray()
  }
}

const postCategoryService = new PostCategoryService()
export default postCategoryService
