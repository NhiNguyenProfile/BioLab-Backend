import { NextFunction, Request, Response } from 'express'
import ErrorMessages from '~/constants/errorMessage'
import { HttpMessage, HttpStatus } from '~/constants/status'
import { ErrorWithStatus } from '~/models/errors'
import { CreateOrderReqBody, UpdateOrderReqBody } from '~/models/requets/order.request'
import orderService from '~/services/order.service'
import { OrderStatus, PaymentStatus } from '~/types/order.type'

class OrderController {
  async createOrder(req: Request<Record<string, string>, any, CreateOrderReqBody>, res: Response, next: NextFunction) {
    const order = await orderService.createOrder(req.body)
    res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      data: order,
      msg: HttpMessage[HttpStatus.CREATED]
    })
  }

  async getOrderById(req: Request, res: Response, next: NextFunction) {
    const order = await orderService.getOrderById(req.params.id)
    if (!order) {
      throw new ErrorWithStatus({ status: HttpStatus.NOT_FOUND, message: ErrorMessages.order.notFound })
    }
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK, data: order })
  }

  async getAllOrders(req: Request, res: Response, next: NextFunction) {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const result = await orderService.getAllOrders(page, limit)
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK, data: result })
  }

  async updateOrder(req: Request<Record<string, string>, any, UpdateOrderReqBody>, res: Response, next: NextFunction) {
    const updatedOrder = await orderService.updateOrder(req.params.id, req.body)
    if (!updatedOrder) {
      throw new ErrorWithStatus({ status: HttpStatus.NOT_FOUND, message: ErrorMessages.order.notFound })
    }
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Order updated successfully',
      data: updatedOrder
    })
  }

  async updateOrderStatus(
    req: Request<Record<string, string>, any, { status?: OrderStatus; payment_status?: PaymentStatus }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { status, payment_status } = req.body
      const { id } = req.params

      const updatedOrder = await orderService.updateOrderStatus(id, status, payment_status)

      if (!updatedOrder) {
        throw new ErrorWithStatus({
          status: HttpStatus.NOT_FOUND,
          message: ErrorMessages.order.notFound
        })
      }

      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Order status updated successfully',
        data: updatedOrder
      })
    } catch (error) {
      next(error)
    }
  }

  async deleteOrder(req: Request, res: Response, next: NextFunction) {
    const deleted = await orderService.deleteOrder(req.params.id)
    if (!deleted) {
      throw new ErrorWithStatus({ status: HttpStatus.NOT_FOUND, message: ErrorMessages.order.notFound })
    }
    res.status(HttpStatus.OK).json({ status: HttpStatus.OK, message: 'Order deleted successfully' })
  }

  async getAllOrdersByPhone(req: Request, res: Response, next: NextFunction) {
    try {
      const phone = req.query.phone as string

      if (!phone) {
        res.status(HttpStatus.BAD_REQUEST).json({
          status: HttpStatus.BAD_REQUEST,
          message: 'Phone number is required'
        })
      } else {
        const result = await orderService.getAllOrdersByPhone(phone)
        res.status(HttpStatus.OK).json({ status: HttpStatus.OK, data: result })
      }
    } catch (error) {
      next(error)
    }
  }
}

const orderController = new OrderController()
export default orderController
