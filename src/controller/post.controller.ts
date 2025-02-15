import { NextFunction, Request, Response } from 'express'
import { HttpStatus, HttpMessage } from '~/constants/status'
import postService from '~/services/post.service'
import { postSchema, updatePostSchema } from '~/validators/post.validation'
import { validate } from '~/middlewares/post.middleware'

class PostController {
  // Tạo bài viết mới
  async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      // Validate dữ liệu đầu vào
      validate(postSchema)(req, res, async () => {
        const payload = req.body
        const post = await postService.createPost(payload)

        res.status(HttpStatus.CREATED).json({
          status: HttpStatus.CREATED,
          message: HttpMessage[HttpStatus.CREATED],
          data: post
        })
      })
    } catch (error) {
      // Xử lý lỗi từ service
      next(error)
    }
  }

  // Cập nhật bài viết
  async updatePost(req: Request, res: Response, next: NextFunction) {
    try {
      // Validate dữ liệu đầu vào
      validate(updatePostSchema)(req, res, async () => {
        const postId = req.params.id
        const payload = req.body
        const updatedPost = await postService.updatePost(postId, payload)

        if (!updatedPost) {
          res.status(HttpStatus.NOT_FOUND).json({
            status: HttpStatus.NOT_FOUND,
            message: 'Post not found'
          })
          return
        }

        res.status(HttpStatus.OK).json({
          status: HttpStatus.OK,
          message: 'Post updated successfully',
          data: updatedPost
        })
      })
    } catch (error) {
      next(error)
    }
  }

  // Các phương thức khác giữ nguyên
  async getPostById(req: Request, res: Response, next: NextFunction) {
    try {
      const postId = req.params.id
      const post = await postService.getPostById(postId)

      if (!post) {
        res.status(HttpStatus.NOT_FOUND).json({
          status: HttpStatus.NOT_FOUND,
          message: 'Post not found'
        })
        return
      }

      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: HttpMessage[HttpStatus.OK],
        data: post
      })
    } catch (error) {
      next(error)
    }
  }

  async deletePost(req: Request, res: Response, next: NextFunction) {
    try {
      const postId = req.params.id
      await postService.deletePost(postId)

      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Post deleted successfully'
      })
    } catch (error) {
      next(error)
    }
  }

  async getAllPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1
      const limit = parseInt(req.query.limit as string) || 10
      const result = await postService.getAllPosts(page, limit)

      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: HttpMessage[HttpStatus.OK],
        data: result
      })
    } catch (error) {
      next(error)
    }
  }
}

const postController = new PostController()
export default postController
// import { NextFunction, Request, Response } from 'express'
// import { HttpStatus, HttpMessage } from '~/constants/status'
// import postService from '~/services/post.service'
// import { PostType } from '~/types/post.type'

// class PostController {
//   // Tạo bài viết mới
//   async createPost(req: Request, res: Response, next: NextFunction) {
//     try {
//       const payload = req.body as PostType
//       const post = await postService.createPost(payload)

//       res.status(HttpStatus.CREATED).json({
//         status: HttpStatus.CREATED,
//         message: HttpMessage[HttpStatus.CREATED],
//         data: post
//       })
//     } catch (error) {
//       next(error)
//     }
//   }

//   // Lấy thông tin bài viết theo ID
//   async getPostById(req: Request, res: Response, next: NextFunction) {
//     try {
//       const postId = req.params.id
//       const post = await postService.getPostById(postId)

//       if (!post) {
//         res.status(HttpStatus.NOT_FOUND).json({
//           status: HttpStatus.NOT_FOUND,
//           message: 'Post not found'
//         })
//         return
//       }

//       res.status(HttpStatus.OK).json({
//         status: HttpStatus.OK,
//         message: HttpMessage[HttpStatus.OK],
//         data: post
//       })
//     } catch (error) {
//       next(error)
//     }
//   }

//   // Cập nhật bài viết
//   async updatePost(req: Request, res: Response, next: NextFunction) {
//     try {
//       const postId = req.params.id
//       const payload = req.body as Partial<PostType>
//       const updatedPost = await postService.updatePost(postId, payload)

//       if (!updatedPost) {
//         res.status(HttpStatus.NOT_FOUND).json({
//           status: HttpStatus.NOT_FOUND,
//           message: 'Post not found'
//         })
//         return
//       }

//       res.status(HttpStatus.OK).json({
//         status: HttpStatus.OK,
//         message: 'Post updated successfully',
//         data: updatedPost
//       })
//     } catch (error) {
//       next(error)
//     }
//   }

//   // Xóa bài viết
//   async deletePost(req: Request, res: Response, next: NextFunction) {
//     try {
//       const postId = req.params.id
//       await postService.deletePost(postId)

//       res.status(HttpStatus.OK).json({
//         status: HttpStatus.OK,
//         message: 'Post deleted successfully'
//       })
//     } catch (error) {
//       next(error)
//     }
//   }

//   // Lấy tất cả bài viết
//   async getAllPosts(req: Request, res: Response, next: NextFunction) {
//     try {
//       const page = parseInt(req.query.page as string) || 1
//       const limit = parseInt(req.query.limit as string) || 10
//       const result = await postService.getAllPosts(page, limit)

//       res.status(HttpStatus.OK).json({
//         status: HttpStatus.OK,
//         message: HttpMessage[HttpStatus.OK],
//         data: result
//       })
//     } catch (error) {
//       next(error)
//     }
//   }
// }

// const postController = new PostController()
// export default postController
