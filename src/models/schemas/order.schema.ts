import { ObjectId } from 'mongodb'
import { OrderItemType, OrderStatus, OrderType, PaymentStatus } from '~/types/order.type'

export default class Order {
  _id: ObjectId
  customer_name: string
  email: string
  phone: string
  order_date: Date
  total_amount: number
  status: OrderStatus
  payment_status: PaymentStatus
  payment_method: string
  address: string
  item_type?: OrderItemType

  subscription_info?: {
    is_continue?: boolean
    start_date?: Date
    duration_months?: number
    delivery_day?: number
    recurring_total?: number
    next_delivery_date?: Date
    subscription_status?: 'active' | 'paused' | 'cancelled' | 'completed'
    deliveries_completed?: number
    deliveries_remaining?: number
    last_delivery_date?: Date
  }

  constructor(order: OrderType) {
    this._id = order._id || new ObjectId()
    this.customer_name = order.customer_name
    this.email = order.email
    this.phone = order.phone
    this.order_date = order.order_date || new Date()
    this.total_amount = order.total_amount
    this.status = order.status
    this.payment_status = order.payment_status
    this.payment_method = order.payment_method
    this.address = order.address
    this.item_type = order.item_type

    if (order.subscription_info) {
      this.subscription_info = order.subscription_info
    }
  }
}
