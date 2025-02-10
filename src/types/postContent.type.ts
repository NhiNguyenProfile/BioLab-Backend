import { ObjectId } from 'mongodb'

enum ContentType {
  TEXT,
  IMAGE
}

interface PostContentType {
  content: string
  type: ContentType
}

export { PostContentType, ContentType }
