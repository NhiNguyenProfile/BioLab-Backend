import { NextFunction, Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { HttpStatus } from '~/constants/status'
import ErrorMessages from '~/constants/errorMessage'
import { ErrorWithStatus } from '~/models/errors'
import { CreateSOPOrderReqBody, UpdateSOPOrderStatusReqBody } from '~/models/requets/orderSOPDetail.request'

class SOPOrderMiddleware {
  validateCreateSOPOrder(
    req: Request<Record<string, string>, any, CreateSOPOrderReqBody>,
    res: Response,
    next: NextFunction
  ) {
    const { customer_name, email, phone, payment_method, address, sop_id, quantity } = req.body

    if (!customer_name || !email || !phone || !payment_method || !address || !sop_id) {
      return next(
        new ErrorWithStatus({
          status: HttpStatus.BAD_REQUEST,
          message: ErrorMessages.sopOrder.missingRequiredFields
        })
      )
    }

    if (!ObjectId.isValid(sop_id)) {
      return next(
        new ErrorWithStatus({
          status: HttpStatus.BAD_REQUEST,
          message: ErrorMessages.sopOrder.invalidSopId
        })
      )
    }

    if (!quantity || quantity < 1) {
      req.body.quantity = 1 
    }

    if (req.body.subscription_info) {
      if (!req.body.subscription_info.duration_months || req.body.subscription_info.duration_months < 1) {
        req.body.subscription_info.duration_months = 1
      }

      if (!req.body.subscription_info.start_date) {
        req.body.subscription_info.start_date = new Date().toISOString()
      }

      try {
        new Date(req.body.subscription_info.start_date)
      } catch (error) {
        return next(
          new ErrorWithStatus({
            status: HttpStatus.BAD_REQUEST,
            message: ErrorMessages.sopOrder.invalidStartDate
          })
        )
      }

      if (!req.body.subscription_info.delivery_day) {
        const startDate = new Date(req.body.subscription_info.start_date)
        req.body.subscription_info.delivery_day = startDate.getDate()
      }
    }

    next()
  }

  validateUpdateSOPOrderStatus(
    req: Request<Record<string, string>, any, UpdateSOPOrderStatusReqBody>,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params

    if (!ObjectId.isValid(id)) {
      return next(
        new ErrorWithStatus({
          status: HttpStatus.BAD_REQUEST,
          message: ErrorMessages.sopOrder.invalidOrderId
        })
      )
    }

    const { status, payment_status, subscription_status } = req.body

    if (!status && !payment_status && !subscription_status) {
      return next(
        new ErrorWithStatus({
          status: HttpStatus.BAD_REQUEST,
          message: ErrorMessages.sopOrder.noStatusProvided
        })
      )
    }

    next()
  }

  validateOrderId(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

    if (!ObjectId.isValid(id)) {
      return next(
        new ErrorWithStatus({
          status: HttpStatus.BAD_REQUEST,
          message: ErrorMessages.sopOrder.invalidOrderId
        })
      )
    }

    next()
  }
}

const sopOrderMiddleware = new SOPOrderMiddleware()
export default sopOrderMiddleware
