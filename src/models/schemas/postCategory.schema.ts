import { ObjectId } from 'mongodb'
import { PostCategoryType } from '~/types/postCategory.type'

export default class Post {
  private post_category_id: ObjectId
  private post_category_name: string

  constructor(postCategory: PostCategoryType) {
    this.post_category_id = postCategory.post_category_id
    this.post_category_name = postCategory.post_category_name
  }

  public getpostId(): ObjectId {
    return this.post_category_id
  }

  public getpostName(): string {
    return this.post_category_name
  }

  public setpostName(post_category_name: string): void {
    this.post_category_name = post_category_name
  }
}
