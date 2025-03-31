import { Router } from 'express'
import sopOrderController from '~/controller/sopOrder.controller'
import sopOrderMiddleware from '~/middlewares/sopOrder.middleware'
import { wrapAsync } from '~/utils/handler'

const sopOrderRouter = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     SOPOrderDetail:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID of the SOP order detail
 *         order_id:
 *           type: string
 *           description: ID of the order
 *         sop_id:
 *           type: string
 *           description: ID of the SOP
 *         quantity:
 *           type: number
 *           description: Quantity of the SOP
 *         price:
 *           type: number
 *           description: Price per unit of the SOP
 *         subtotal:
 *           type: number
 *           description: Total price (price * quantity)
 *         sop_snapshot:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: Name of the SOP at the time of ordering
 *             description:
 *               type: string
 *               description: Description of the SOP at the time of ordering
 *             image_url:
 *               type: string
 *               description: Image URL of the SOP at the time of ordering
 *         products:
 *           type: array
 *           description: Products in the SOP at the time of ordering
 *           items:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: string
 *                 description: ID of the product
 *               name:
 *                 type: string
 *                 description: Name of the product
 *               price:
 *                 type: number
 *                 description: Price of the product
 *               quantity:
 *                 type: number
 *                 description: Quantity of the product
 *               image_url:
 *                 type: string
 *                 description: Image URL of the product
 *               description:
 *                 type: string
 *                 description: Description of the product
 *
 *     CreateSOPOrder:
 *       type: object
 *       required:
 *         - customer_name
 *         - email
 *         - phone
 *         - payment_method
 *         - address
 *         - sop_id
 *       properties:
 *         customer_name:
 *           type: string
 *           description: Name of the customer
 *         email:
 *           type: string
 *           format: email
 *           description: Email of the customer
 *         phone:
 *           type: string
 *           description: Phone number of the customer
 *         payment_method:
 *           type: string
 *           description: Payment method
 *         address:
 *           type: string
 *           description: Delivery address
 *         sop_id:
 *           type: string
 *           description: ID of the SOP
 *         quantity:
 *           type: number
 *           description: Quantity of the SOP
 *           default: 1
 *         subscription_info:
 *           type: object
 *           description: Subscription information for recurring orders
 *           properties:
 *             is_continue:
 *               type: boolean
 *               description: Whether to automatically continue the subscription
 *             start_date:
 *               type: string
 *               format: date-time
 *               description: Start date of the subscription
 *             duration_months:
 *               type: number
 *               description: Duration of the subscription in months
 *             delivery_day:
 *               type: number
 *               description: Day of the month for delivery
 *
 *     UpdateSOPOrderStatus:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum: [PROCESSING, DELIVERED, COMPLETED, CANCELLED]
 *           description: Order status
 *         payment_status:
 *           type: string
 *           enum: [PAID, UNPAID]
 *           description: Payment status
 *         subscription_status:
 *           type: string
 *           enum: [active, paused, cancelled, completed]
 *           description: Subscription status
 */

/**
 * @swagger
 * tags:
 *   name: SOP Orders
 *   description: Set of Products (SOP) Orders management
 */

/**
 * @swagger
 * /sop-orders/payment:
 *   post:
 *     summary: Create a payment link for SOP order
 *     tags: [SOP Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSOPOrder'
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
 *                 data:
 *                   type: object
 *                   properties:
 *                     order_id:
 *                       type: string
 *                       description: ID of the created order
 *                     orderCode:
 *                       type: number
 *                       description: Unique order code
 *                     checkoutUrl:
 *                       type: string
 *                       description: URL to the payment page
 *                     amount:
 *                       type: number
 *                       description: Total amount to pay
 *                     sopInfo:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           description: Name of the SOP
 *                         image_url:
 *                           type: string
 *                           description: Image URL of the SOP
 *                 msg:
 *                   type: string
 *                   example: "Order created and payment link generated successfully"
 *       400:
 *         description: Bad request - Missing required fields or invalid data
 *       404:
 *         description: SOP not found
 */
sopOrderRouter.post(
  '/payment',
  sopOrderMiddleware.validateCreateSOPOrder,
  wrapAsync(sopOrderController.createSOPOrderPayment)
)

/**
 * @swagger
 * /sop-orders/payment/callback:
 *   get:
 *     summary: Handle payment callback from PayOS
 *     tags: [SOP Orders]
 *     parameters:
 *       - in: query
 *         name: order_code
 *         schema:
 *           type: string
 *         required: true
 *         description: Order code from payment
 *     responses:
 *       302:
 *         description: Redirects to success or cancel page
 *         headers:
 *           Location:
 *             description: URL to redirect to
 *             schema:
 *               type: string
 */
sopOrderRouter.get(
  '/payment/callback',
  wrapAsync(sopOrderController.handlePaymentCallback)
)

/**
 * @swagger
 * /sop-orders/payment/webhook:
 *   post:
 *     summary: Handle payment webhook from PayOS
 *     tags: [SOP Orders]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Webhook received successfully
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
 *                   example: "Webhook received successfully"
 *                 data:
 *                   type: object
 *                   description: Webhook data received from PayOS
 */
sopOrderRouter.post(
  '/payment/webhook',
  wrapAsync(sopOrderController.handlePaymentWebhook)
)

/**
 * @swagger
 * /sop-orders:
 *   post:
 *     summary: Create a new SOP order
 *     tags: [SOP Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSOPOrder'
 *     responses:
 *       201:
 *         description: SOP order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 201
 *                 data:
 *                   type: object
 *                   properties:
 *                     order_id:
 *                       type: string
 *                       description: ID of the created order
 *                 msg:
 *                   type: string
 *                   example: "Resource created successfully"
 *       400:
 *         description: Bad request - Missing required fields or invalid data
 *       404:
 *         description: SOP not found
 */
sopOrderRouter.post(
  '/',
  sopOrderMiddleware.validateCreateSOPOrder,
  wrapAsync(sopOrderController.createSOPOrder)
)

/**
 * @swagger
 * /sop-orders/subscriptions:
 *   get:
 *     summary: Get all subscription orders
 *     tags: [SOP Orders]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of subscription orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     orders:
 *                       type: array
 *                       items:
 *                         type: object
 *                         description: Order details
 *                     total:
 *                       type: number
 *                       description: Total number of orders
 *                     page:
 *                       type: number
 *                       description: Current page number
 *                     limit:
 *                       type: number
 *                       description: Number of items per page
 *                     totalPages:
 *                       type: number
 *                       description: Total number of pages
 *       500:
 *         description: Internal server error
 */
sopOrderRouter.get(
  '/subscriptions',
  wrapAsync(sopOrderController.getContinueOrders)
)

/**
 * @swagger
 * /sop-orders/pending-deliveries:
 *   get:
 *     summary: Get all orders with pending delivery for today
 *     tags: [SOP Orders]
 *     responses:
 *       200:
 *         description: List of orders pending delivery
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Order details
 *       500:
 *         description: Internal server error
 */
sopOrderRouter.get(
  '/pending-deliveries',
  wrapAsync(sopOrderController.getPendingDeliveries)
)

/**
 * @swagger
 * /sop-orders/{id}:
 *   get:
 *     summary: Get SOP order by ID
 *     tags: [SOP Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     order:
 *                       type: object
 *                       description: Order details
 *                     sop_detail:
 *                       $ref: '#/components/schemas/SOPOrderDetail'
 *       400:
 *         description: Invalid order ID
 *       404:
 *         description: Order not found
 */
sopOrderRouter.get(
  '/:id',
  sopOrderMiddleware.validateOrderId,
  wrapAsync(sopOrderController.getSOPOrderById)
)

/**
 * @swagger
 * /sop-orders/{id}/status:
 *   patch:
 *     summary: Update SOP order status
 *     tags: [SOP Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateSOPOrderStatus'
 *     responses:
 *       200:
 *         description: Order status updated successfully
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
 *                   example: "Order status updated successfully"
 *                 data:
 *                   type: object
 *                   description: Updated order details
 *       400:
 *         description: Invalid order ID or status values
 *       404:
 *         description: Order not found
 */
sopOrderRouter.patch(
  '/:id/status',
  sopOrderMiddleware.validateUpdateSOPOrderStatus,
  wrapAsync(sopOrderController.updateSOPOrderStatus)
)

export default sopOrderRouter