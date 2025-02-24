import { ObjectId } from 'mongodb'
import { PostStatus } from '~/types/post.type'
import { PostCategoryType } from '~/types/postCategory.type'
import PostContent from './postContent.schema'

export default class Post {
  _id: ObjectId
  title: string
  category: PostCategoryType[]
  created_date: Date
  status: PostStatus
  banner: string
  post_contents: string

  constructor(post: {
    _id?: ObjectId
    title: string
    category: PostCategoryType[]
    created_date: Date
    status: PostStatus
    banner: string
    post_contents: string
  }) {
    this._id = post._id || new ObjectId()
    this.title = post.title
    this.category = post.category
    this.created_date = post.created_date
    this.status = post.status
    this.banner = post.banner
    this.post_contents = post.post_contents
  }
}
