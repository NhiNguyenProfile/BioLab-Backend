import { ObjectId } from 'mongodb'
import { PostCategoryType } from './postCategory.type'

enum PostStatus {
  PUBLISHED,
  DRAFT
}

interface PostType {
  _id?: ObjectId
  title: string
  banner: string
  category: PostCategoryType[]
  created_date: Date
  status: PostStatus
  post_contents: string
}

export { PostType, PostStatus }
