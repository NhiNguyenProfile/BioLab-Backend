import { NextFunction, Request, Response } from 'express'
import ErrorMessages from '~/constants/errorMessage'
import { HttpMessage, HttpStatus } from '~/constants/status'
import { ErrorWithStatus } from '~/models/errors'
import { CreateProductDetailReqBody, UpdateProductDetailReqBody } from '~/models/requets/productDetail.request'
import productDetailService from '~/services/productDetail.service'

class ProductDetailController {
  async createProductDetail(
    req: Request<Record<string, string>, any, CreateProductDetailReqBody>,
    res: Response,
    next: NextFunction
  ) {
    const productDetail = await productDetailService.createProductDetail(req.body)
    res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      data: productDetail,
      msg: HttpMessage[HttpStatus.CREATED]
    })
  }

  async getProductDetailById(req: Request, res: Response, next: NextFunction) {
    const productDetail = await productDetailService.getProductDetailById(req.params.id)
    if (!productDetail) {
      throw new ErrorWithStatus({ status: HttpStatus.NOT_FOUND, message: ErrorMessages.productDetail.notFound })
    }
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK, data: productDetail })
  }

  async getAllProductDetails(req: Request, res: Response, next: NextFunction) {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const result = await productDetailService.getAllProductDetails(page, limit)
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK, data: result })
  }

  async updateProductDetail(
    req: Request<Record<string, string>, any, UpdateProductDetailReqBody>,
    res: Response,
    next: NextFunction
  ) {
    const updatedProductDetail = await productDetailService.updateProductDetail(req.params.id, req.body)
    if (!updatedProductDetail) {
      throw new ErrorWithStatus({ status: HttpStatus.NOT_FOUND, message: ErrorMessages.productDetail.notFound })
    }
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Product detail updated successfully',
      data: updatedProductDetail
    })
  }

  async deleteProductDetail(req: Request, res: Response, next: NextFunction) {
    const deleted = await productDetailService.deleteProductDetail(req.params.id)
    if (!deleted) {
      throw new ErrorWithStatus({ status: HttpStatus.NOT_FOUND, message: ErrorMessages.productDetail.notFound })
    }
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK, message: 'Product detail deleted successfully' })
  }
}

const productDetailController = new ProductDetailController()
export default productDetailController
