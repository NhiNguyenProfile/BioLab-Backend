import { ObjectId } from 'mongodb'
import databaseService from './database.service'
import { CategoryType } from '~/types/category.type'
import { CreateCategoryReqBody, UpdateCategoryReqBody } from '~/models/requets/category.request'

class CategoryService {
  constructor() {}

  async createCategory(payload: CreateCategoryReqBody) {
    const newCategory: CategoryType = {
      _id: new ObjectId(),
      category_name: payload.category_name
    }

    const result = await databaseService.categories.insertOne(newCategory)
    return {
      category_id: result.insertedId,
      message: 'Category created successfully'
    }
  }

  async getCategoryById(categoryId: string) {
    if (!ObjectId.isValid(categoryId)) throw new Error('Invalid category ID format')

    const category = await databaseService.categories.findOne({ _id: new ObjectId(categoryId) })
    if (!category) throw new Error('Category not found!')
    return category
  }

  async updateCategory(categoryId: string, updateData: Partial<UpdateCategoryReqBody>) {
    if (!ObjectId.isValid(categoryId)) throw new Error('Invalid category ID format')

    const result = await databaseService.categories.findOneAndUpdate(
      { _id: new ObjectId(categoryId) },
      { $set: updateData },
      { returnDocument: 'after' }
    )
    if (!result) throw new Error('Category not found or update failed!')
    return result
  }

  async deleteCategory(categoryId: string) {
    if (!ObjectId.isValid(categoryId)) throw new Error('Invalid category ID format')

    const result = await databaseService.categories.deleteOne({ _id: new ObjectId(categoryId) })
    if (result.deletedCount === 0) throw new Error('Category not found or already deleted!')
    return { message: 'Category deleted successfully' }
  }

  async getAllCategories() {
    return await databaseService.categories.find({}).toArray()
  }
}

const categoryService = new CategoryService()
export default categoryService
