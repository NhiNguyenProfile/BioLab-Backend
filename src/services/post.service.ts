import { ObjectId } from 'mongodb'
import { PostType, PostStatus } from '~/types/post.type'
import Post from '~/models/schemas/post.schema'
import databaseService from '~/services/database.service'
import PostContent from '~/models/schemas/postContent.schema'

class PostService {
  private async checkCategoriesExist(categories: { _id: ObjectId }[]) {
    const categoryIds = categories.map((cat) => cat._id)
    const existingCategories = await databaseService.postCategories.find({ _id: { $in: categoryIds } }).toArray()
    return existingCategories.length === categoryIds.length
  }

  private async checkUserExists(userId: ObjectId) {
    const user = await databaseService.users.findOne({ _id: userId })
    return !!user
  }

  async createPost(payload: PostType) {
    const { title, category, user_id, status, postContents } = payload
    const userId = new ObjectId(user_id)

    const isUserValid = await this.checkUserExists(userId)
    if (!isUserValid) {
      throw new Error('User not found')
    }

    const result = await databaseService.posts.insertOne(
      new Post({
        title,
        category,
        user_id: userId,
        created_date: new Date(),
        status: status || PostStatus.DRAFT,
        postContents
      })
    )

    const post = await databaseService.posts.findOne({ _id: result.insertedId })
    return post
  }

  async updatePost(postId: string, payload: Partial<PostType>) {
    const { title, category, status, postContents } = payload

    const updateData: any = {
      $set: {},
      $currentDate: { updated_date: true }
    }

    if (title) updateData.$set.title = title
    if (category) updateData.$set.category = category
    if (status) updateData.$set.status = status
    if (postContents) updateData.$set.postContents = postContents

    const result = await databaseService.posts.updateOne({ _id: new ObjectId(postId) }, updateData)

    if (result.modifiedCount === 0) {
      throw new Error('Post update failed or no changes detected')
    }

    const updatedPost = await databaseService.posts.findOne({ _id: new ObjectId(postId) })
    return updatedPost
  }

  async getPostById(postId: string) {
    const post = await databaseService.posts.findOne({ _id: new ObjectId(postId) })
    if (!post) {
      throw new Error('Post not found')
    }
    return post
  }

  async deletePost(postId: string) {
    const result = await databaseService.posts.deleteOne({ _id: new ObjectId(postId) })
    if (result.deletedCount === 0) {
      throw new Error('Post not found or delete failed')
    }
    return true
  }

  async getAllPosts(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit
    const posts = await databaseService.posts.find({}).skip(skip).limit(limit).toArray()

    const total = await databaseService.posts.countDocuments()
    return {
      data: posts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }
  }
}

const postService = new PostService()
export default postService
