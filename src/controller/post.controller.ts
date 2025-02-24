import { NextFunction, Request, Response } from 'express'
import ErrorMessages from '~/constants/errorMessage'
import { HttpMessage, HttpStatus } from '~/constants/status'
import { ErrorWithStatus } from '~/models/errors'
import { PostType } from '~/types/post.type'
import postService from '~/services/post.service'

class PostController {
  async createPost(req: Request<Record<string, string>, any, PostType>, res: Response, next: NextFunction) {
    const post = await postService.createPost(req.body)
    res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      data: post,
      msg: HttpMessage[HttpStatus.CREATED]
    })
  }

  async getPostById(req: Request, res: Response, next: NextFunction) {
    const post = await postService.getPostById(req.params.id)
    if (!post) {
      throw new ErrorWithStatus({ status: HttpStatus.NOT_FOUND, message: ErrorMessages.post.notFound })
    }
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK, data: post })
  }

  async getAllPosts(req: Request, res: Response, next: NextFunction) {
    const posts = await postService.getAllPosts()
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK, data: posts })
  }

  async updatePost(req: Request<Record<string, string>, any, Partial<PostType>>, res: Response, next: NextFunction) {
    const updatedPost = await postService.updatePost(req.params.id, req.body)
    if (!updatedPost) {
      throw new ErrorWithStatus({ status: HttpStatus.NOT_FOUND, message: ErrorMessages.post.notFound })
    }
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Post updated successfully',
      data: updatedPost
    })
  }

  async deletePost(req: Request, res: Response, next: NextFunction) {
    const deleted = await postService.deletePost(req.params.id)
    if (!deleted) {
      throw new ErrorWithStatus({ status: HttpStatus.NOT_FOUND, message: ErrorMessages.post.notFound })
    }
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK, message: 'Post deleted successfully' })
  }
}

const postController = new PostController()
export default postController
