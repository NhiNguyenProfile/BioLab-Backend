import { NextFunction, Request, Response } from 'express'
import ErrorMessages from '~/constants/errorMessage'
import { HttpMessage, HttpStatus } from '~/constants/status'
import { ErrorWithStatus } from '~/models/errors'
import { CreateProductReqBody, UpdateProductReqBody } from '~/models/requets/product.request'
import productService from '~/services/product.service'

class ProductController {
  async createProduct(
    req: Request<Record<string, string>, any, CreateProductReqBody>,
    res: Response,
    next: NextFunction
  ) {
    const product = await productService.createProduct(req.body)
    res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      data: product,
      msg: HttpMessage[HttpStatus.CREATED]
    })
  }

  async getProductById(req: Request, res: Response, next: NextFunction) {
    const product = await productService.getProductById(req.params.id)
    if (!product) {
      throw new ErrorWithStatus({ status: HttpStatus.NOT_FOUND, message: ErrorMessages.product.notFound })
    }
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK, data: product })
  }

  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const result = await productService.getAllProducts()
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK, data: result })
  }

  async updateProduct(
    req: Request<Record<string, string>, any, UpdateProductReqBody>,
    res: Response,
    next: NextFunction
  ) {
    const updatedProduct = await productService.updateProduct(req.params.id, req.body)
    if (!updatedProduct) {
      throw new ErrorWithStatus({ status: HttpStatus.NOT_FOUND, message: ErrorMessages.product.notFound })
    }
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Product updated successfully',
      data: updatedProduct
    })
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    const deleted = await productService.deleteProduct(req.params.id)
    if (!deleted) {
      throw new ErrorWithStatus({ status: HttpStatus.NOT_FOUND, message: ErrorMessages.product.notFound })
    }
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK, message: 'Product deleted successfully' })
  }
}

const productController = new ProductController()
export default productController
