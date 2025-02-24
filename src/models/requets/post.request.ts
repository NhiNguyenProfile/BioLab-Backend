import { PostStatus } from '~/types/post.type'
import { PostCategoryType } from '~/types/postCategory.type'

export interface CreatePostReqBody {
  title: string
  category: PostCategoryType[]
  created_date: Date
  status: PostStatus
  banner: string
  post_contents: string
}

export interface UpdatePostReqBody {
  title: string
  category: PostCategoryType[]
  created_date: Date
  status: PostStatus
  banner: string
  post_contents: string
}
