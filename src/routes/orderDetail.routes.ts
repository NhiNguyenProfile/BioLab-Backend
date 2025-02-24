import { Router } from 'express'
import orderDetailController from '~/controller/orderDetail.controller'
import { updateOrderValidator } from '~/middlewares/order.middleware'
import { wrapAsync } from '~/utils/handler'

const orderDetailRouter = Router()

/**
 * Description. Create a new order
 * Path: /orders
 * Method: POST
 * Body: { customer_id: string, order_items: Array<{ product_id: string, quantity: number }>, total_price: number }
 */
orderDetailRouter.post('/', wrapAsync(orderDetailController.createOrderDetail))

/**
 * Description. Get order by ID
 * Path: /orders/:id
 * Method: GET
 * Params: { id: string }
 */
orderDetailRouter.get('/:id', wrapAsync(orderDetailController.getOrderDetailById))

/**
 * Description. Get all orders (with pagination)
 * Path: /orders
 * Method: GET
 * Query: { page?: number, limit?: number }
 */
orderDetailRouter.get('/', wrapAsync(orderDetailController.getAllOrderDetailsByOrderId))

/**
 * Description. Update order by ID
 * Path: /orders/:id
 * Method: PUT
 * Params: { id: string }
 * Body: { order_items?: Array<{ product_id: string, quantity: number }>, total_price?: number }
 */
orderDetailRouter.put('/:id', updateOrderValidator, wrapAsync(orderDetailController.updateOrderDetail))

/**
 * Description. Delete order by ID
 * Path: /orders/:id
 * Method: DELETE
 * Params: { id: string }
 */
orderDetailRouter.delete('/:id', wrapAsync(orderDetailController.deleteOrderDetail))

export default orderDetailRouter
