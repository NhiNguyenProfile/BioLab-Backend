import { ObjectId } from 'mongodb'
import Post from '~/models/schemas/post.schema'
import { PostStatus } from '~/types/post.type'
import databaseService from './database.service'
import { CreatePostReqBody } from '~/models/requets/post.request'
import { ErrorWithStatus } from '~/models/errors'

class PostService {
  constructor() {}

  async createPost(payload: CreatePostReqBody) {
    const { status, created_date, ...data } = payload
    const newPost = new Post({
      _id: new ObjectId(),
      status: PostStatus.PUBLISHED,
      created_date: new Date(),
      ...data
    })

    const result = await databaseService.posts.insertOne(newPost)
    return {
      post_id: result.insertedId,
      message: 'Post created successfully'
    }
  }

  async getPostById(postId: string) {
    if (!ObjectId.isValid(postId)) throw new Error('Invalid post ID format')

    const post = await databaseService.posts.findOne({ _id: new ObjectId(postId) })
    if (!post) throw new ErrorWithStatus({ message: 'Post not found!', status: 400 })
    return post
  }

  async updatePost(postId: string, updateData: Partial<Post>) {
    if (!ObjectId.isValid(postId)) throw new Error('Invalid post ID format')

    const result = await databaseService.posts.findOneAndUpdate(
      { _id: new ObjectId(postId) },
      { $set: updateData },
      { returnDocument: 'after' }
    )
    if (!result) throw new ErrorWithStatus({ message: 'Post not found or update failed!', status: 400 })
    return result
  }

  async deletePost(postId: string) {
    if (!ObjectId.isValid(postId)) throw new Error('Invalid post ID format')

    const result = await databaseService.posts.findOneAndUpdate(
      { _id: new ObjectId(postId) },
      { $set: { status: PostStatus.DRAFT } },
      { returnDocument: 'after' }
    )
    if (!result) throw new ErrorWithStatus({ message: 'Post not found or already deleted!', status: 400 })
    return { message: 'Post deleted successfully' }
  }

  async getAllPosts() {
    return await databaseService.posts.find({}).toArray()
  }
}

const postService = new PostService()
export default postService
