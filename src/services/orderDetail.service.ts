import { ObjectId } from 'mongodb'
import OrderDetail from '~/models/schemas/orderDetail.schema'
import databaseService from './database.service'
import { CreateOrderDetailReqBody, UpdateOrderDetailReqBody } from '~/models/requets/orderDetail.request'

class OrderDetailService {
  constructor() {}

  async createOrderDetail(payload: CreateOrderDetailReqBody) {
    if (!ObjectId.isValid(payload.order_id) || !ObjectId.isValid(payload.product_id)) {
      throw new Error('Invalid order ID or product ID format')
    }

    const newOrderDetail = new OrderDetail({
      _id: new ObjectId(),
      order_id: new ObjectId(payload.order_id),
      product_id: new ObjectId(payload.product_id),
      quantity: payload.quantity,
      subtotal: payload.subtotal
    })

    const result = await databaseService.orderDetails.insertOne(newOrderDetail)
    return {
      order_detail_id: result.insertedId,
      message: 'Order detail created successfully'
    }
  }

  async getOrderDetailById(orderDetailId: string) {
    if (!ObjectId.isValid(orderDetailId)) throw new Error('Invalid order detail ID format')

    const orderDetail = await databaseService.orderDetails.findOne({ _id: new ObjectId(orderDetailId) })
    if (!orderDetail) throw new Error('Order detail not found!')
    return orderDetail
  }

  async updateOrderDetail(orderDetailId: string, updateData: Partial<UpdateOrderDetailReqBody>) {
    if (!ObjectId.isValid(orderDetailId)) throw new Error('Invalid order detail ID format')

    const result = await databaseService.orderDetails.findOneAndUpdate(
      { _id: new ObjectId(orderDetailId) },
      { $set: updateData },
      { returnDocument: 'after' }
    )
    if (!result) throw new Error('Order detail not found or update failed!')
    return result
  }

  async deleteOrderDetail(orderDetailId: string) {
    if (!ObjectId.isValid(orderDetailId)) throw new Error('Invalid order detail ID format')

    const result = await databaseService.orderDetails.deleteOne({ _id: new ObjectId(orderDetailId) })
    if (result.deletedCount === 0) throw new Error('Order detail not found or already deleted!')
    return { message: 'Order detail deleted successfully' }
  }

  async getAllOrderDetailsByProductId(productId: string) {
    if (!ObjectId.isValid(productId)) throw new Error('Invalid product ID format')

    const orderDetails = await databaseService.orderDetails.find({ product_id: new ObjectId(productId) }).toArray()
    return orderDetails
  }
}

const orderDetailService = new OrderDetailService()
export default orderDetailService
