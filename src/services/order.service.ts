import { ObjectId } from 'mongodb'
import Order from '~/models/schemas/order.schema'
import databaseService from './database.service'
import { CreateOrderReqBody, UpdateOrderReqBody } from '~/models/requets/order.request'

class OrderService {
  constructor() {}

  async createOrder(payload: CreateOrderReqBody) {
    const newOrder = new Order({
      _id: new ObjectId(),
      order_date: new Date(),
      ...payload
    })

    const result = await databaseService.orders.insertOne(newOrder)
    return {
      order_id: result.insertedId,
      message: 'Order created successfully'
    }
  }

  async getOrderById(orderId: string) {
    if (!ObjectId.isValid(orderId)) throw new Error('Invalid order ID format')

    const order = await databaseService.orders.findOne({ _id: new ObjectId(orderId) })
    if (!order) throw new Error('Order not found!')
    return order
  }

  async updateOrder(orderId: string, updateData: Partial<UpdateOrderReqBody>) {
    if (!ObjectId.isValid(orderId)) throw new Error('Invalid order ID format')

    const result = await databaseService.orders.findOneAndUpdate(
      { _id: new ObjectId(orderId) },
      { $set: updateData },
      { returnDocument: 'after' }
    )
    if (!result) throw new Error('Order not found or update failed!')
    return result
  }

  async deleteOrder(orderId: string) {
    if (!ObjectId.isValid(orderId)) throw new Error('Invalid order ID format')

    const result = await databaseService.orders.deleteOne({ _id: new ObjectId(orderId) })
    if (result.deletedCount === 0) throw new Error('Order not found or already deleted!')
    return { message: 'Order deleted successfully' }
  }

  async getAllOrders(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit
    const orders = await databaseService.orders.find({}).skip(skip).limit(limit).toArray()

    const total = await databaseService.orders.countDocuments()
    return {
      data: orders,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }
  }
}

const orderService = new OrderService()
export default orderService
