import { ObjectId } from 'mongodb'
import { ContentType, PostContentType } from '~/types/postContent.type'

export default class PostContent {
  private content_id: ObjectId
  private post_id: ObjectId
  private content: string
  private type: ContentType
  private order: number

  constructor(content: PostContentType) {
    this.content_id = content.content_id || new ObjectId()
    this.post_id = content.post_id
    this.content = content.content
    this.type = content.type
    this.order = content.order
  }

  public getContentId(): ObjectId {
    return this.content_id
  }

  public getPostId(): ObjectId {
    return this.post_id
  }

  public getContent(): string {
    return this.content
  }

  public getType(): ContentType {
    return this.type
  }

  public getOrder(): number {
    return this.order
  }

  public setContent(content: string): void {
    this.content = content
  }

  public setType(type: ContentType): void {
    this.type = type
  }

  public setOrder(order: number): void {
    this.order = order
  }

  public setPostId(post_id: ObjectId): void {
    this.post_id = post_id
  }
}
