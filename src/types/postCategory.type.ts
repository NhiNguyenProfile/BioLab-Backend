import { ObjectId } from 'mongodb'

interface PostCategoryType {
  post_category_id: ObjectId
  post_category_name: string
}

export { PostCategoryType }
