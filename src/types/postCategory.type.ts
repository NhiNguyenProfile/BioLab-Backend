import { ObjectId } from 'mongodb'

interface PostCategoryType {
  _id: ObjectId
  post_category_name: string
}

export { PostCategoryType }
