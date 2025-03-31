import { ObjectId } from 'mongodb'
import Order from '~/models/schemas/order.schema'
import databaseService from './database.service'
import { CreateOrderReqBody, UpdateOrderReqBody } from '~/models/requets/order.request'
import { OrderItemType, OrderStatus, OrderType, PaymentStatus } from '~/types/order.type'
import { CreateSOPOrderReqBody, UpdateSOPOrderStatusReqBody } from '../models/requets/orderSOPDetail.request'
import sopService from './sop.service'
import orderSOPDetailService from './orderSOPDetail.service'

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

  async updateOrderStatus(orderId: string, status?: OrderStatus, payment_status?: PaymentStatus) {
    if (!ObjectId.isValid(orderId)) {
      throw new Error('Invalid order ID format')
    }

    const updateData: Partial<{ status: OrderStatus; payment_status: PaymentStatus }> = {}

    if (status) {
      updateData.status = status
    }

    if (payment_status) {
      updateData.payment_status = payment_status
    }
    if (Object.keys(updateData).length === 0) {
      throw new Error('No update data provided')
    }

    const result = await databaseService.orders.findOneAndUpdate(
      { _id: new ObjectId(orderId) },
      { $set: updateData },
      { returnDocument: 'after' }
    )

    if (!result) {
      throw new Error('Order not found or update failed!')
    }

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

  async getAllListOrders() {
    try {
      const orders = await databaseService.orders.find({}).toArray()
      return orders
    } catch (error) {
      console.error('Error in getAllListOrders:', error)
      throw error
    }
  }

  async getAllOrdersByPhone(phone: string) {
    const orders = await databaseService.orders.find({ phone: phone }).toArray()
    return {
      data: orders
    }
  }

  //new
  async createSOPOrder(payload: CreateSOPOrderReqBody) {
    if (!ObjectId.isValid(payload.sop_id)) throw new Error('Invalid SOP ID format')

    const sop = await sopService.getSOPById(payload.sop_id)
    if (!sop) throw new Error('SOP not found')

    const sopPrice = sop.combo.reduce((total, product) => total + (product.price || 0), 0)
    const totalAmount = sopPrice * payload.quantity

    let orderData: OrderType = {
      customer_name: payload.customer_name,
      email: payload.email,
      phone: payload.phone,
      order_date: new Date(),
      total_amount: totalAmount,
      status: OrderStatus.PROCESSING,
      payment_status: PaymentStatus.UNPAID,
      payment_method: payload.payment_method,
      address: payload.address,
      item_type: OrderItemType.SOP
    }

    if (payload.subscription_info) {
      const startDate = payload.subscription_info.start_date
        ? new Date(payload.subscription_info.start_date)
        : new Date()

      const deliveryDay = payload.subscription_info.delivery_day || startDate.getDate()
      const durationMonths = payload.subscription_info.duration_months || 1

      const nextDeliveryDate = new Date(startDate)
      nextDeliveryDate.setMonth(nextDeliveryDate.getMonth() + 1)
      nextDeliveryDate.setDate(deliveryDay)

      orderData.subscription_info = {
        is_continue: payload.subscription_info.is_continue || false,
        start_date: startDate,
        duration_months: durationMonths,
        delivery_day: deliveryDay,
        recurring_total: totalAmount,
        next_delivery_date: nextDeliveryDate,
        subscription_status: 'active',
        deliveries_completed: 0,
        deliveries_remaining: durationMonths
      }
    }

    const orderResult = await this.createOrder(orderData)

    await orderSOPDetailService.createOrderSOPDetailFromSOP(
      orderResult.order_id.toString(),
      payload.sop_id,
      payload.quantity,
      sopPrice
    )

    return {
      order_id: orderResult.order_id,
      message: 'SOP order created successfully'
    }
  }

  async updateSOPOrderStatus(orderId: string, payload: UpdateSOPOrderStatusReqBody) {
    if (!ObjectId.isValid(orderId)) throw new Error('Invalid order ID format')

    const order = await this.getOrderById(orderId)

    const updateData: any = {}

    if (payload.status) {
      updateData.status = payload.status
    }

    if (payload.payment_status) {
      updateData.payment_status = payload.payment_status
    }

    if (order.subscription_info && payload.subscription_status) {
      updateData['subscription_info.subscription_status'] = payload.subscription_status

      if (payload.status === OrderStatus.DELIVERED) {
        updateData['subscription_info.deliveries_completed'] = (order.subscription_info?.deliveries_completed || 0) + 1
        updateData['subscription_info.deliveries_remaining'] = (order.subscription_info?.deliveries_remaining || 0) - 1
        updateData['subscription_info.last_delivery_date'] = new Date()

        if (
          order.subscription_info?.is_continue &&
          order.subscription_info?.next_delivery_date &&
          order.subscription_info?.delivery_day &&
          (order.subscription_info?.deliveries_remaining || 0) > 1
        ) {
          const nextDeliveryDate = new Date(order.subscription_info.next_delivery_date)
          nextDeliveryDate.setMonth(nextDeliveryDate.getMonth() + 1)
          updateData['subscription_info.next_delivery_date'] = nextDeliveryDate
        }

        if ((order.subscription_info?.deliveries_remaining || 0) <= 1) {
          updateData['subscription_info.subscription_status'] = 'completed'
        }
      }
    }

    const result = await databaseService.orders.findOneAndUpdate(
      { _id: new ObjectId(orderId) },
      { $set: updateData },
      { returnDocument: 'after' }
    )

    if (!result) throw new Error('Order not found or update failed')
    return result
  }

  async getContinueOrders(page = 1, limit = 10) {
    const skip = (page - 1) * limit
    const orders = await databaseService.orders
      .find({
        item_type: OrderItemType.SOP,
        'subscription_info.is_continue': true
      })
      .sort({ 'subscription_info.next_delivery_date': 1 })
      .skip(skip)
      .limit(limit)
      .toArray()

    const total = await databaseService.orders.countDocuments({
      item_type: OrderItemType.SOP,
      'subscription_info.is_continue': true
    })
    const totalPages = Math.ceil(total / limit)

    return {
      orders,
      total,
      page,
      limit,
      totalPages
    }
  }

  async getPendingDeliveries() {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    return await databaseService.orders
      .find({
        item_type: OrderItemType.SOP,
        'subscription_info.subscription_status': 'active',
        'subscription_info.next_delivery_date': {
          $gte: today,
          $lt: tomorrow
        }
      })
      .toArray()
  }

  async findOrderByOrderCode(orderCode: string) {
    return await databaseService.orders.findOne({ orderCode })
  }

  async updateOrderPaymentStatus(orderId: string, paymentStatus: PaymentStatus) {
    if (!ObjectId.isValid(orderId)) throw new Error('Invalid order ID format')

    const result = await databaseService.orders.findOneAndUpdate(
      { _id: new ObjectId(orderId) },
      { $set: { payment_status: paymentStatus } },
      { returnDocument: 'after' }
    )

    if (!result) throw new Error('Order not found or update failed')
    return result
  }
}

const orderService = new OrderService()
export default orderService
