import { Router } from 'express'
import { createPayment, handleWebhook } from '~/controller/payment.controller'
import { wrapAsync } from '~/utils/handler'

const router = Router()

/**
 * @swagger
 * /payment/create-payment:
 *   post:
 *     summary: Create a new payment link
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderCode
 *               - amount
 *               - returnUrl
 *               - cancelUrl
 *             properties:
 *               orderCode:
 *                 type: number
 *                 description: Unique code for the order
 *               amount:
 *                 type: number
 *                 description: Payment amount (in VND)
 *               description:
 *                 type: string
 *                 description: Description of the payment
 *                 default: "Thanh toán đơn hàng"
 *               returnUrl:
 *                 type: string
 *                 description: URL to redirect after successful payment
 *               cancelUrl:
 *                 type: string
 *                 description: URL to redirect after cancelled payment
 *     responses:
 *       200:
 *         description: Payment link created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Payment successfully!"
 *                 data:
 *                   type: object
 *                   properties:
 *                     checkoutUrl:
 *                       type: string
 *                       description: URL for the payment page
 *                       example: "https://pay.payos.vn/web/checkout/xxx-yyy-zzz"
 *       400:
 *         description: Invalid request parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Errors!"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal Server Errors!"
 *                 data:
 *                   type: object
 *                   properties:
 *                     checkoutUrl:
 *                       type: object
 *                       description: Error details
 */
router.post('/create-payment', wrapAsync(createPayment))

/**
 * @swagger
 * /payment/payos-webhook:
 *   post:
 *     summary: Handle payment webhook from PayOS
 *     description: Endpoint to receive and process payment status updates from PayOS payment gateway
 *     tags: [Payment]
 *     requestBody:
 *       description: Webhook data sent by PayOS
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *                 description: Order ID
 *               transactionId:
 *                 type: string
 *                 description: Transaction ID
 *               orderCode:
 *                 type: number
 *                 description: Order code
 *               amount:
 *                 type: number
 *                 description: Payment amount
 *               status:
 *                 type: string
 *                 description: Payment status
 *                 enum: [PAID, CANCELLED, PENDING]
 *               signature:
 *                 type: string
 *                 description: Signature to verify webhook data authenticity
 *     responses:
 *       200:
 *         description: Webhook processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Payment successfully!"
 *                 data:
 *                   type: object
 *                   description: Verified webhook data
 */
router.post('/payos-webhook', wrapAsync(handleWebhook))

export default router