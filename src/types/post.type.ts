import { ObjectId } from 'mongodb'
import { PostCategoryType } from './postCategory.type'

enum PostStatus {
  PUBLISHED,
  DRAFT
}

interface PostType {
  post_id?: ObjectId
  title: string
  category: PostCategoryType[]
  created_date: Date
  user_id: ObjectId
  status: PostStatus
}

export { PostType, PostStatus }
