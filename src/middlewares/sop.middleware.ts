import { NextFunction, Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { HttpStatus } from '~/constants/status'
import ErrorMessages from '~/constants/errorMessage'
import { ErrorWithStatus } from '~/models/errors'
import { CreateSOPReqBody, AddProductToSOPReqBody, RemoveProductFromSOPReqBody } from '~/models/requets/sop.request'

class SOPMiddleware {
  validateSOPId(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    if (!ObjectId.isValid(id)) {
      return next(
        new ErrorWithStatus({
          message: ErrorMessages.sop.invalidId,
          status: HttpStatus.BAD_REQUEST
        })
      )
    }
    next()
  }

  validateCreateSOP(
    req: Request<Record<string, string>, any, CreateSOPReqBody>,
    res: Response,
    next: NextFunction
  ) {
    const { name, description, image_url, combo } = req.body
    
    if (!name || !description || !image_url) {
      return next(
        new ErrorWithStatus({
          message: ErrorMessages.sop.missingFields,
          status: HttpStatus.BAD_REQUEST
        })
      )
    }
    
    // Validate combo
    if (!Array.isArray(combo)) {
      return next(
        new ErrorWithStatus({
          message: ErrorMessages.sop.invalidComboFormat,
          status: HttpStatus.BAD_REQUEST
        })
      )
    }
    
    // Validate product IDs
    for (const productId of combo) {
      if (!ObjectId.isValid(productId)) {
        return next(
          new ErrorWithStatus({
            message: ErrorMessages.product.invalidId,
            status: HttpStatus.BAD_REQUEST
          })
        )
      }
    }
    
    next()
  }

  validateAddProductToSOP(
    req: Request<Record<string, string>, any, AddProductToSOPReqBody>,
    res: Response,
    next: NextFunction
  ) {
    const { product_id } = req.body
    
    if (!product_id) {
      return next(
        new ErrorWithStatus({
          message: ErrorMessages.product.missingId,
          status: HttpStatus.BAD_REQUEST
        })
      )
    }
    
    if (!ObjectId.isValid(product_id)) {
      return next(
        new ErrorWithStatus({
          message: ErrorMessages.product.invalidId,
          status: HttpStatus.BAD_REQUEST
        })
      )
    }
    
    next()
  }

  validateRemoveProductFromSOP(
    req: Request<Record<string, string>, any, RemoveProductFromSOPReqBody>,
    res: Response,
    next: NextFunction
  ) {
    const { product_id } = req.body
    
    if (!product_id) {
      return next(
        new ErrorWithStatus({
          message: ErrorMessages.product.missingId,
          status: HttpStatus.BAD_REQUEST
        })
      )
    }
    
    if (!ObjectId.isValid(product_id)) {
      return next(
        new ErrorWithStatus({
          message: ErrorMessages.product.invalidId,
          status: HttpStatus.BAD_REQUEST
        })
      )
    }
    
    next()
  }
}

const sopMiddleware = new SOPMiddleware()
export default sopMiddleware