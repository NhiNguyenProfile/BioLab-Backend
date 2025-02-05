import { ObjectId } from 'mongodb'

enum ContentType {
  TEXT,
  IMAGE
}

interface PostContentType {
  content_id?: ObjectId
  post_id: ObjectId
  content: string
  type: ContentType
  order: number
}

export { PostContentType, ContentType }
