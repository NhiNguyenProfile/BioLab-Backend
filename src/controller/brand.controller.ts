import { NextFunction, Request, Response } from 'express'
import ErrorMessages from '~/constants/errorMessage'
import { HttpMessage, HttpStatus } from '~/constants/status'
import { ErrorWithStatus } from '~/models/errors'
import { CreateBrandReqBody, UpdateBrandReqBody } from '~/models/requets/brand.request'
import brandService from '~/services/brand.service'

class BrandController {
  async createBrand(req: Request<Record<string, string>, any, CreateBrandReqBody>, res: Response, next: NextFunction) {
    const brand = await brandService.createBrand(req.body)
    res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      data: brand,
      msg: HttpMessage[HttpStatus.CREATED]
    })
  }

  async getBrandById(req: Request, res: Response, next: NextFunction) {
    const brand = await brandService.getBrandById(req.params.id)
    if (!brand) {
      throw new ErrorWithStatus({ status: HttpStatus.NOT_FOUND, message: ErrorMessages.brand.notFound })
    }
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK, data: brand })
  }

  async getAllBrands(req: Request, res: Response, next: NextFunction) {
    const brands = await brandService.getAllBrands()
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK, data: brands })
  }

  async updateBrand(req: Request<Record<string, string>, any, UpdateBrandReqBody>, res: Response, next: NextFunction) {
    const updatedBrand = await brandService.updateBrand(req.params.id, req.body)
    if (!updatedBrand) {
      throw new ErrorWithStatus({ status: HttpStatus.NOT_FOUND, message: ErrorMessages.brand.notFound })
    }
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Brand updated successfully',
      data: updatedBrand
    })
  }

  async deleteBrand(req: Request, res: Response, next: NextFunction) {
    const deleted = await brandService.deleteBrand(req.params.id)
    if (!deleted) {
      throw new ErrorWithStatus({ status: HttpStatus.NOT_FOUND, message: ErrorMessages.brand.notFound })
    }
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK, message: 'Brand deleted successfully' })
  }

  async getBrandFeatured(req: Request, res: Response, next: NextFunction) {
    const result = await brandService.getBrandFeatured(req.params.id)
    if (!result) {
      throw new ErrorWithStatus({ status: HttpStatus.NOT_FOUND, message: ErrorMessages.brand.notFound })
    }
    res
      .status(HttpStatus.OK)
      .json({ status: HttpStatus.OK, message: "Get brand's featured successfully", data: result })
  }
}

const brandController = new BrandController()
export default brandController
