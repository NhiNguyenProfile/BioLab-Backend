import { ObjectId } from 'mongodb'
import { OrderStatus, OrderType, PaymentStatus } from '~/types/order.type'

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

  constructor(order: OrderType) {
    this._id = order._id || new ObjectId()
    this.customer_name = order.customer_name
    this.email = order.email
    this.phone = order.phone
    this.order_date = order.order_date
    this.status = order.status
    this.payment_status = order.payment_status
    this.payment_method = order.payment_method
    this.total_amount = order.total_amount
    this.address = order.address
  }
}
