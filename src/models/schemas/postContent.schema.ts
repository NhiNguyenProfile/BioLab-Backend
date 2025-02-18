import { ObjectId } from 'mongodb'
import { ContentType, PostContentType } from '~/types/postContent.type'

export default class PostContent {
  content: string
  type: ContentType

  constructor(content: PostContentType) {
    this.content = content.content
    this.type = content.type
  }
}
