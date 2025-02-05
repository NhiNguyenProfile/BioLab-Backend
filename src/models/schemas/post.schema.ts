import { ObjectId } from 'mongodb'
import { PostStatus } from '~/types/post.type'
import { PostCategoryType } from '~/types/postCategory.type'

export default class Post {
  private post_id: ObjectId
  private title: string
  private category: PostCategoryType[]
  private created_date: Date
  private user_id: ObjectId
  private status: PostStatus

  constructor(post: {
    post_id?: ObjectId
    title: string
    category: PostCategoryType[]
    created_date: Date
    user_id: ObjectId
    status: PostStatus
  }) {
    this.post_id = post.post_id || new ObjectId()
    this.title = post.title
    this.category = post.category
    this.created_date = post.created_date
    this.user_id = post.user_id
    this.status = post.status
  }

  public getPostId(): ObjectId {
    return this.post_id
  }

  public getTitle(): string {
    return this.title
  }

  public getcategory(): PostCategoryType[] {
    return this.category
  }

  public getCreatedDate(): Date {
    return this.created_date
  }

  public getUserId(): ObjectId {
    return this.user_id
  }

  public getStatus(): PostStatus {
    return this.status
  }

  public setTitle(title: string): void {
    this.title = title
  }

  public setcategory(category: PostCategoryType[]): void {
    this.category = category
  }

  public setCreatedDate(created_date: Date): void {
    this.created_date = created_date
  }

  public setUserId(user_id: ObjectId): void {
    this.user_id = user_id
  }

  public setStatus(status: PostStatus): void {
    this.status = status
  }
}
