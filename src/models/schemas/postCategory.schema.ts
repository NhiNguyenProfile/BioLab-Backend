import { ObjectId } from 'mongodb'
import { PostCategoryType } from '~/types/postCategory.type'

export default class Post {
  _id: ObjectId
  post_category_name: string

  constructor(postCategory: PostCategoryType) {
    this._id = postCategory._id
    this.post_category_name = postCategory.post_category_name
  }
}
