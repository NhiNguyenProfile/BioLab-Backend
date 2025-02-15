import { ObjectId } from 'mongodb'
import { PostType, PostStatus } from '~/types/post.type'
import Post from '~/models/schemas/post.schema'
import databaseService from '~/services/database.service'
import PostContent from '~/models/schemas/postContent.schema'

class PostService {
  // Truy cập collection posts
  private get posts() {
    return databaseService.getDb().collection(process.env.DB_POST_COLLECTION as string)
  }

  // Truy cập collection postCategories
  private get postCategories() {
    return databaseService.getDb().collection(process.env.DB_POST_CATEGORY_COLLECTION as string)
  }

  // Truy cập collection users
  private get users() {
    return databaseService.getDb().collection(process.env.DB_USER_COLLECTION as string)
  }

  // Kiểm tra xem các category_id có tồn tại không
  private async checkCategoriesExist(categories: { _id: ObjectId }[]) {
    const categoryIds = categories.map((cat) => cat._id)
    const existingCategories = await this.postCategories.find({ _id: { $in: categoryIds } }).toArray()
    return existingCategories.length === categoryIds.length
  }

  // Kiểm tra xem user_id có tồn tại không
  private async checkUserExists(userId: ObjectId) {
    const user = await this.users.findOne({ _id: userId })
    return !!user
  }

  // Tạo bài viết mới
  async createPost(payload: PostType) {
    const { title, category, user_id, status, postContents } = payload

    // Chuyển đổi user_id thành ObjectId
    const userId = new ObjectId(user_id)

    // Kiểm tra xem user_id có tồn tại không
    const isUserValid = await this.checkUserExists(userId)
    if (!isUserValid) {
      return
    }

    // Tạo bài viết mới
    const result = await this.posts.insertOne(
      new Post({
        title,
        category,
        user_id: userId,
        created_date: new Date(),
        status: status || PostStatus.DRAFT,
        postContents: postContents.map((content) => new PostContent(content))
      })
    )

    // Trả về thông tin bài viết vừa tạo
    const post = await this.posts.findOne({ _id: result.insertedId })
    return post
  }

  // Cập nhật bài viết
  async updatePost(postId: string, payload: Partial<PostType>) {
    const { title, category, status, postContents } = payload

    // Cập nhật thông tin bài viết
    const updateData: any = {
      $set: {},
      $currentDate: { updated_date: true }
    }

    if (title) updateData.$set.title = title
    if (category) updateData.$set.category = category
    if (status) updateData.$set.status = status
    if (postContents) updateData.$set.postContents = postContents.map((content) => new PostContent(content))

    await this.posts.updateOne({ _id: new ObjectId(postId) }, updateData)

    // Trả về thông tin bài viết sau khi cập nhật
    const updatedPost = await this.posts.findOne({ _id: new ObjectId(postId) })
    return updatedPost
  }

  // Các phương thức khác giữ nguyên
  async getPostById(postId: string) {
    const post = await this.posts.findOne({ _id: new ObjectId(postId) })
    return post
  }

  async deletePost(postId: string) {
    await this.posts.deleteOne({ _id: new ObjectId(postId) })
    return true
  }

  async getAllPosts(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit
    const posts = await this.posts.find({}).skip(skip).limit(limit).toArray()

    const total = await this.posts.countDocuments()
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

// import { ObjectId } from 'mongodb'
// import { PostType, PostStatus } from '~/types/post.type'
// import Post from '~/models/schemas/post.schema'
// import databaseService from './database.service'
// import PostContent from '~/models/schemas/postContent.schema'

// class PostService {
//   // Truy cập collection posts
//   private get posts() {
//     return databaseService.getDb().collection('posts')
//   }

//   // Tạo bài viết mới
//   async createPost(payload: PostType) {
//     const { title, category, user_id, status, postContents } = payload

//     // Tạo bài viết mới
//     const result = await this.posts.insertOne(
//       new Post({
//         title,
//         category,
//         user_id: new ObjectId(user_id),
//         created_date: new Date(),
//         status: status || PostStatus.DRAFT, // Mặc định là DRAFT nếu không có status
//         postContents: postContents.map((content) => new PostContent(content))
//       })
//     )

//     // Trả về thông tin bài viết vừa tạo
//     const post = await this.posts.findOne({ _id: result.insertedId })
//     return post
//   }

//   // Lấy thông tin bài viết theo ID
//   async getPostById(postId: string) {
//     const post = await this.posts.findOne({ _id: new ObjectId(postId) })
//     return post
//   }

//   // Cập nhật bài viết
//   async updatePost(postId: string, payload: Partial<PostType>) {
//     const { title, category, status, postContents } = payload

//     // Cập nhật thông tin bài viết
//     await this.posts.updateOne(
//       { _id: new ObjectId(postId) },
//       {
//         $set: {
//           title,
//           category,
//           status,
//           postContents: postContents?.map((content) => new PostContent(content))
//         },
//         $currentDate: { updated_date: true } // Cập nhật ngày chỉnh sửa
//       }
//     )

//     // Trả về thông tin bài viết sau khi cập nhật
//     const updatedPost = await this.posts.findOne({ _id: new ObjectId(postId) })
//     return updatedPost
//   }

//   // Xóa bài viết
//   async deletePost(postId: string) {
//     await this.posts.deleteOne({ _id: new ObjectId(postId) })
//     return true // Trả về true nếu xóa thành công
//   }

//   // Lấy tất cả bài viết
//   async getAllPosts(page: number = 1, limit: number = 10) {
//     const skip = (page - 1) * limit
//     const posts = await this.posts.find({}).skip(skip).limit(limit).toArray()

//     const total = await this.posts.countDocuments()
//     return {
//       data: posts,
//       pagination: {
//         total,
//         page,
//         limit,
//         totalPages: Math.ceil(total / limit)
//       }
//     }
//   }
// }

// const postService = new PostService()
// export default postService
