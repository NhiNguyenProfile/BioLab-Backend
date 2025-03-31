import { Router } from 'express'
import orderController from '~/controller/order.controller'
import { updateOrderValidator, validateUpdateOrderStatus } from '~/middlewares/order.middleware'
import { wrapAsync } from '~/utils/handler'

const orderRouter = Router()

/**
 * Description: Get all orders by phone
 * Path: /orders/by-phone
 * Method: GET
 * Query: { phone: string }
 */
orderRouter.get('/by-phone', wrapAsync(orderController.getAllOrdersByPhone))

/**
 * Description. Create a new order
 * Path: /orders
 * Method: POST
 * Body: { customer_id: string, order_items: Array<{ product_id: string, quantity: number }>, total_price: number }
 */
orderRouter.post('/', wrapAsync(orderController.createOrder))

/**
 * @swagger
 * /orders/all:
 *   get:
 *     summary: Lấy tất cả đơn hàng không phân trang
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Lấy danh sách đơn hàng thành công
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
 *                     $ref: '#/components/schemas/Order'
 *       500:
 *         description: Lỗi server
 */
orderRouter.get('/all', wrapAsync(orderController.getAllListOrders))

/**
 * Description. Update order status & payment status
 * Path: /orders/:id/status
 * Method: PATCH
 * Params: { id: string }
 * Body: { status?: OrderStatus, payment_status?: PaymentStatus }
 */
orderRouter.patch('/:id/status', validateUpdateOrderStatus, wrapAsync(orderController.updateOrderStatus))

/**
 * Description. Get order by ID
 * Path: /orders/:id
 * Method: GET
 * Params: { id: string }
 */
orderRouter.get('/:id', wrapAsync(orderController.getOrderById))

/**
 * Description. Get all orders (with pagination)
 * Path: /orders
 * Method: GET
 * Query: { page?: number, limit?: number }
 */
orderRouter.get('/', wrapAsync(orderController.getAllOrders))

/**
 * Description. Update order by ID
 * Path: /orders/:id
 * Method: PUT
 * Params: { id: string }
 * Body: { order_items?: Array<{ product_id: string, quantity: number }>, total_price?: number }
 */
orderRouter.put('/:id', updateOrderValidator, wrapAsync(orderController.updateOrder))

/**
 * Description. Delete order by ID
 * Path: /orders/:id
 * Method: DELETE
 * Params: { id: string }
 */
orderRouter.delete('/:id', wrapAsync(orderController.deleteOrder))

export default orderRouter
