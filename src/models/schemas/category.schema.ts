import { ObjectId } from 'mongodb'
import { CategoryType } from '~/types/category.type'

export default class Category {
  private category_id: ObjectId
  private category_name: string

  constructor(category: CategoryType) {
    this.category_id = category.category_id || new ObjectId()
    this.category_name = category.category_name
  }

  public getCategoryId(): ObjectId {
    return this.category_id
  }

  public getCategoryName(): string {
    return this.category_name
  }

  public setCategoryName(category_name: string): void {
    this.category_name = category_name
  }
}
