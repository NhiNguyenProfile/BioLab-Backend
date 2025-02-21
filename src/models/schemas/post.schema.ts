import { ObjectId } from 'mongodb'
import { PostStatus } from '~/types/post.type'
import { PostCategoryType } from '~/types/postCategory.type'
import PostContent from './postContent.schema'

export default class Post {
  _id: ObjectId
  title: string
  category: PostCategoryType[]
  created_date: Date
  user_id: ObjectId
  status: PostStatus
  postContents: string

  constructor(post: {
    _id?: ObjectId
    title: string
    category: PostCategoryType[]
    created_date: Date
    user_id: ObjectId
    status: PostStatus
    postContents: string
  }) {
    this._id = post._id || new ObjectId()
    this.title = post.title
    this.category = post.category
    this.created_date = post.created_date
    this.user_id = post.user_id
    this.status = post.status
    this.postContents = post.postContents
  }
}
