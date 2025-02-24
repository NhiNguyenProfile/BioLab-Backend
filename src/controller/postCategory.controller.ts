import { NextFunction, Request, Response } from 'express'
import ErrorMessages from '~/constants/errorMessage'
import { HttpMessage, HttpStatus } from '~/constants/status'
import { ErrorWithStatus } from '~/models/errors'
import { CreatePostCategoryReqBody, UpdatePostCategoryReqBody } from '~/models/requets/postCategory.request'
import postCategoryService from '~/services/postCategory.service'

class PostCategoryController {
  async createPostCategory(
    req: Request<Record<string, string>, any, CreatePostCategoryReqBody>,
    res: Response,
    next: NextFunction
  ) {
    const category = await postCategoryService.createPostCategory(req.body)
    res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      data: category,
      msg: HttpMessage[HttpStatus.CREATED]
    })
  }

  async getPostCategoryById(req: Request, res: Response, next: NextFunction) {
    const category = await postCategoryService.getPostCategoryById(req.params.id)
    if (!category) {
      throw new ErrorWithStatus({ status: HttpStatus.NOT_FOUND, message: ErrorMessages.category.notFound })
    }
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK, data: category })
  }

  async getAllCategories(req: Request, res: Response, next: NextFunction) {
    const categories = await postCategoryService.getAllCategories()
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK, data: categories })
  }

  async updatePostCategory(
    req: Request<Record<string, string>, any, UpdatePostCategoryReqBody>,
    res: Response,
    next: NextFunction
  ) {
    const updatedPostCategory = await postCategoryService.updatePostCategory(req.params.id, req.body)
    if (!updatedPostCategory) {
      throw new ErrorWithStatus({ status: HttpStatus.NOT_FOUND, message: ErrorMessages.category.notFound })
    }
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Post Category updated successfully',
      data: updatedPostCategory
    })
  }

  async deletePostCategory(req: Request, res: Response, next: NextFunction) {
    const deleted = await postCategoryService.deletePostCategory(req.params.id)
    if (!deleted) {
      throw new ErrorWithStatus({ status: HttpStatus.NOT_FOUND, message: ErrorMessages.category.notFound })
    }
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK, message: 'Post Category deleted successfully' })
  }
}

const postCategoryController = new PostCategoryController()
export default postCategoryController
