import { NextFunction, Request, Response } from 'express'
import ErrorMessages from '~/constants/errorMessage'
import { HttpMessage, HttpStatus } from '~/constants/status'
import { ErrorWithStatus } from '~/models/errors'
import { CreateOrderDetailReqBody, UpdateOrderDetailReqBody } from '~/models/requets/orderDetail.request'
import orderDetailService from '~/services/orderDetail.service'

class OrderDetailController {
  async createOrderDetail(
    req: Request<Record<string, string>, any, CreateOrderDetailReqBody>,
    res: Response,
    next: NextFunction
  ) {
    const orderDetail = await orderDetailService.createOrderDetail(req.body)
    res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      data: orderDetail,
      msg: HttpMessage[HttpStatus.CREATED]
    })
  }

  async getOrderDetailById(req: Request, res: Response, next: NextFunction) {
    const orderDetail = await orderDetailService.getOrderDetailById(req.params.id)
    if (!orderDetail) {
      throw new ErrorWithStatus({ status: HttpStatus.NOT_FOUND, message: ErrorMessages.orderDetail.notFound })
    }
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK, data: orderDetail })
  }

  async getAllOrderDetailsByProductId(req: Request, res: Response, next: NextFunction) {
    const productId = req.params.productId
    const orderDetails = await orderDetailService.getAllOrderDetailsByProductId(productId)
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK, data: orderDetails })
  }

  async updateOrderDetail(
    req: Request<Record<string, string>, any, UpdateOrderDetailReqBody>,
    res: Response,
    next: NextFunction
  ) {
    const updatedOrderDetail = await orderDetailService.updateOrderDetail(req.params.id, req.body)
    if (!updatedOrderDetail) {
      throw new ErrorWithStatus({ status: HttpStatus.NOT_FOUND, message: ErrorMessages.orderDetail.notFound })
    }
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Order detail updated successfully',
      data: updatedOrderDetail
    })
  }

  async deleteOrderDetail(req: Request, res: Response, next: NextFunction) {
    const deleted = await orderDetailService.deleteOrderDetail(req.params.id)
    if (!deleted) {
      throw new ErrorWithStatus({ status: HttpStatus.NOT_FOUND, message: ErrorMessages.orderDetail.notFound })
    }
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK, message: 'Order detail deleted successfully' })
  }
}

const orderDetailController = new OrderDetailController()
export default orderDetailController
