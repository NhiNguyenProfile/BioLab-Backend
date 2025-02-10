import { ObjectId } from 'mongodb'
import { CategoryType } from '~/types/category.type'

export default class Category {
  _id: ObjectId
  category_name: string

  constructor(category: CategoryType) {
    this._id = category._id || new ObjectId()
    this.category_name = category.category_name
  }
}
