import { Request, Response } from 'express'
import { payOSService } from '../services/payos.service'
import { HttpStatus } from '~/constants/status'

export const createPayment = async (req: Request, res: Response) => {
  try {
    const { orderCode, amount, description, returnUrl, cancelUrl } = req.body

    if (!orderCode || !amount || !returnUrl || !cancelUrl) {
      res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: 'Errors!'
      })
    }

    const orderData = {
      orderCode,
      amount,
      description: description || 'Thanh toán đơn hàng',
      returnUrl,
      cancelUrl
    }

    const paymentLinkResponse = await payOSService.createPaymentLink(orderData)
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Payment successfully!',
      data: {
        checkoutUrl: paymentLinkResponse.checkoutUrl
      }
    })
  } catch (error) {
    console.error(error)
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Errors!',
      data: {
        checkoutUrl: error
      }
    })
  }
}

export const handleWebhook = async (req: Request, res: Response) => {
  console.log('Webhook thanh toán nhận dữ liệu:', req.body)
  const webhookData = payOSService.verifyPaymentWebhookData(req.body)

  res.status(HttpStatus.OK).json({
    status: HttpStatus.OK,
    message: 'Payment successfully!',
    data: webhookData
  })
}
