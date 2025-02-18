import { NextFunction, Request, Response } from 'express'
import ErrorMessages from '~/constants/errorMessage'
import { HttpMessage, HttpStatus } from '~/constants/status'
import { ErrorWithStatus } from '~/models/errors'
import { CreateCategoryReqBody, UpdateCategoryReqBody } from '~/models/requets/category.request'
import categoryService from '~/services/category.service'

class CategoryController {
  async createCategory(
    req: Request<Record<string, string>, any, CreateCategoryReqBody>,
    res: Response,
    next: NextFunction
  ) {
    const category = await categoryService.createCategory(req.body)
    res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      data: category,
      msg: HttpMessage[HttpStatus.CREATED]
    })
  }

  async getCategoryById(req: Request, res: Response, next: NextFunction) {
    const category = await categoryService.getCategoryById(req.params.id)
    if (!category) {
      throw new ErrorWithStatus({ status: HttpStatus.NOT_FOUND, message: ErrorMessages.category.notFound })
    }
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK, data: category })
  }

  async getAllCategories(req: Request, res: Response, next: NextFunction) {
    const categories = await categoryService.getAllCategories()
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK, data: categories })
  }

  async updateCategory(
    req: Request<Record<string, string>, any, UpdateCategoryReqBody>,
    res: Response,
    next: NextFunction
  ) {
    const updatedCategory = await categoryService.updateCategory(req.params.id, req.body)
    if (!updatedCategory) {
      throw new ErrorWithStatus({ status: HttpStatus.NOT_FOUND, message: ErrorMessages.category.notFound })
    }
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Category updated successfully',
      data: updatedCategory
    })
  }

  async deleteCategory(req: Request, res: Response, next: NextFunction) {
    const deleted = await categoryService.deleteCategory(req.params.id)
    if (!deleted) {
      throw new ErrorWithStatus({ status: HttpStatus.NOT_FOUND, message: ErrorMessages.category.notFound })
    }
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK, message: 'Category deleted successfully' })
  }
}

const categoryController = new CategoryController()
export default categoryController
