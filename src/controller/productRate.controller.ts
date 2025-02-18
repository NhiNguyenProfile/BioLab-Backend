import { NextFunction, Request, Response } from 'express'
import ErrorMessages from '~/constants/errorMessage'
import { HttpMessage, HttpStatus } from '~/constants/status'
import { ErrorWithStatus } from '~/models/errors'
import { CreateProductRateReqBody, UpdateProductRateReqBody } from '~/models/requets/productRate.request'
import productRateService from '~/services/productRate.service'

class ProductRateController {
  async createProductRate(
    req: Request<Record<string, string>, any, CreateProductRateReqBody>,
    res: Response,
    next: NextFunction
  ) {
    const productRate = await productRateService.createProductRate(req.body)
    res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      data: productRate,
      msg: HttpMessage[HttpStatus.CREATED]
    })
  }

  async getProductRateById(req: Request, res: Response, next: NextFunction) {
    const productRate = await productRateService.getProductRateById(req.params.id)
    if (!productRate) {
      throw new ErrorWithStatus({ status: HttpStatus.NOT_FOUND, message: ErrorMessages.productRate.notFound })
    }
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK, data: productRate })
  }

  async getAllProductRates(req: Request, res: Response, next: NextFunction) {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const result = await productRateService.getAllProductRates(page, limit)
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK, data: result })
  }

  async updateProductRate(
    req: Request<Record<string, string>, any, UpdateProductRateReqBody>,
    res: Response,
    next: NextFunction
  ) {
    const updatedProductRate = await productRateService.updateProductRate(req.params.id, req.body)
    if (!updatedProductRate) {
      throw new ErrorWithStatus({ status: HttpStatus.NOT_FOUND, message: ErrorMessages.productRate.notFound })
    }
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Product rate updated successfully',
      data: updatedProductRate
    })
  }

  async deleteProductRate(req: Request, res: Response, next: NextFunction) {
    const deleted = await productRateService.deleteProductRate(req.params.id)
    if (!deleted) {
      throw new ErrorWithStatus({ status: HttpStatus.NOT_FOUND, message: ErrorMessages.productRate.notFound })
    }
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK, message: 'Product rate deleted successfully' })
  }
}

const productRateController = new ProductRateController()
export default productRateController
