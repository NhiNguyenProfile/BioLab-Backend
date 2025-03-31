import { NextFunction, Request, Response } from 'express'
import { HttpMessage, HttpStatus } from '~/constants/status'
import { ErrorWithStatus } from '~/models/errors'
import orderService from '~/services/order.service'
import orderSOPDetailService from '~/services/orderSOPDetail.service'
import ErrorMessages from '~/constants/errorMessage'
import { CreateSOPOrderReqBody, UpdateSOPOrderStatusReqBody } from '~/models/requets/orderSOPDetail.request'
import pendingOrderService from '~/services/pendingOrder.service'
import { OrderItemType, OrderStatus, OrderType, PaymentStatus } from '~/types/order.type'
import { payOSService } from '~/services/payos.service'
import sopService from '~/services/sop.service'
import { ObjectId } from 'mongodb'

class SOPOrderController {
  async createSOPOrder(
    req: Request<Record<string, string>, any, CreateSOPOrderReqBody>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const order = await orderService.createSOPOrder(req.body)
      res.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        data: order,
        msg: HttpMessage[HttpStatus.CREATED]
      })
    } catch (error: any) {
      next(
        new ErrorWithStatus({
          status: HttpStatus.BAD_REQUEST,
          message: ErrorMessages.sopOrder.failedToCreateOrder
        })
      )
    }
  }

  async getSOPOrderById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const order = await orderService.getOrderById(id)

      const orderSOPDetail = await orderSOPDetailService.getOrderSOPDetailByOrderId(id)

      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: {
          order,
          sop_detail: orderSOPDetail
        }
      })
    } catch (error: any) {
      next(
        new ErrorWithStatus({
          status: HttpStatus.NOT_FOUND,
          message: ErrorMessages.order.notFound
        })
      )
    }
  }

  async updateSOPOrderStatus(
    req: Request<Record<string, string>, any, UpdateSOPOrderStatusReqBody>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params
      const result = await orderService.updateSOPOrderStatus(id, req.body)

      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Order status updated successfully',
        data: result
      })
    } catch (error: any) {
      next(
        new ErrorWithStatus({
          status: HttpStatus.BAD_REQUEST,
          message: ErrorMessages.sopOrder.failedToUpdateStatus
        })
      )
    }
  }

  async getContinueOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1
      const limit = parseInt(req.query.limit as string) || 10

      const result = await orderService.getContinueOrders(page, limit)

      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: result
      })
    } catch (error: any) {
      next(
        new ErrorWithStatus({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ErrorMessages.sopOrder.failedToGetSubscriptions
        })
      )
    }
  }

  async getPendingDeliveries(req: Request, res: Response, next: NextFunction) {
    try {
      const deliveries = await orderService.getPendingDeliveries()

      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: deliveries
      })
    } catch (error: any) {
      next(
        new ErrorWithStatus({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ErrorMessages.sopOrder.failedToGetPendingDeliveries
        })
      )
    }
  }

  async createSOPOrderPayment(
    req: Request<Record<string, string>, any, CreateSOPOrderReqBody>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { sop_id, quantity = 1 } = req.body

      const sop = await sopService.getSOPById(sop_id)
      if (!sop) {
        throw new Error(ErrorMessages.sop.notFound)
      }

      const sopPrice = sop.combo.reduce((total, product) => total + (product.price || 0), 0)
      const totalAmount = sopPrice * quantity

      const orderCode = Number(`${Date.now()}${process.hrtime.bigint() % 1000n}`)

      const orderData: any = {
        customer_name: req.body.customer_name,
        email: req.body.email,
        phone: req.body.phone,
        payment_method: req.body.payment_method,
        address: req.body.address,
        sop_id: req.body.sop_id,
        quantity: req.body.quantity || 1,
        total_amount: totalAmount,
        status: OrderStatus.PROCESSING,
        payment_status: PaymentStatus.UNPAID,
        item_type: OrderItemType.SOP
      }

      if (req.body.subscription_info) {
        orderData.subscription_info = req.body.subscription_info
      }

      const orderResult = await orderService.createSOPOrder(orderData)

      const orderSOPDetail = await orderSOPDetailService.getOrderSOPDetailByOrderId(orderResult.order_id.toString())

      await pendingOrderService.createPendingOrder({
        orderCode: orderCode,
        order_id: new ObjectId(orderResult.order_id),
        order_sop_detail_id: orderSOPDetail._id,
        sop_id: new ObjectId(sop_id),
        created_at: new Date()
      })

      const paymentData = {
        orderCode: orderCode,
        amount: totalAmount,
        description: `Thanh toán đơn SOP`,
        returnUrl: `${process.env.RETURN_URL}?order_code=${orderCode}`,
        cancelUrl: process.env.CANCEL_URL
      }

      const paymentLinkResponse = await payOSService.createPaymentLink(paymentData)

      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        data: {
          order_id: orderResult.order_id,
          orderCode: orderCode,
          checkoutUrl: paymentLinkResponse.checkoutUrl,
          amount: totalAmount,
          sopInfo: {
            name: sop.name,
            image_url: sop.image_url
          }
        },
        msg: 'Order created and payment link generated successfully'
      })
    } catch (error: any) {
      next(
        new ErrorWithStatus({
          status: HttpStatus.BAD_REQUEST,
          message: error?.message || ErrorMessages.sopOrder.failedToCreateOrder
        })
      )
    }
  }

  async handlePaymentWebhook(req: Request, res: Response, next: NextFunction) {
    try {
      const webhookData = payOSService.verifyPaymentWebhookData(req.body)
      console.log('Payment webhook data:', webhookData)

      if (webhookData && webhookData.orderCode) {
        const orderCode = Number(webhookData.orderCode)

        const pendingOrder = await pendingOrderService.getPendingOrderByCode(orderCode)

        if (pendingOrder) {
          await orderService.updateOrderPaymentStatus(pendingOrder.order_id.toString(), PaymentStatus.PAID)

          console.log(`Order ${pendingOrder.order_id} payment status updated to PAID`)

          await pendingOrderService.deletePendingOrder(orderCode)
        } else {
          console.log(`No pending order found with orderCode: ${orderCode}`)
        }
      }

      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Webhook received successfully',
        data: webhookData
      })
    } catch (error: any) {
      console.error('Payment webhook error:', error)
      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'Webhook received but processing failed',
        error: error.message
      })
    }
  }

  async handlePaymentCallback(req: Request, res: Response, next: NextFunction) {
    try {
      const orderCodeParam = req.query.order_code

      if (!orderCodeParam) {
        console.log('No order_code provided in callback')
        return res.redirect(process.env.CANCEL_URL || '/')
      }

      let orderCode: number

      if (Array.isArray(orderCodeParam)) {
        orderCode = Number(orderCodeParam[0]) || 0 
      } else {
        orderCode = Number(orderCodeParam) || 0 
      }

      if (!orderCode) {
        console.log('Invalid order_code format')
        return res.redirect(process.env.CANCEL_URL || '/')
      }

      console.log(`Payment callback received for order: ${orderCode}`)

      const pendingOrder = await pendingOrderService.getPendingOrderByCode(orderCode)

      if (!pendingOrder) {
        console.log(`No pending order found for code: ${orderCode}`)
        return res.redirect(process.env.CANCEL_URL || '/')
      }

      return res.redirect(`${process.env.RETURN_URL}?status=success&order=${orderCode}`)
    } catch (error: any) {
      console.error('Payment callback error:', error)

      return res.redirect(`${process.env.CANCEL_URL}?error=${encodeURIComponent(error.message || 'Unknown error')}`)
    }
  }
}

const sopOrderController = new SOPOrderController()
export default sopOrderController
