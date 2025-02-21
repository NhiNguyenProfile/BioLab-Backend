import { ObjectId } from 'mongodb'
import { OrderType } from '~/types/order.type'

export default class Order {
  _id: ObjectId
  customer_id: ObjectId
  order_date: Date
  total_amount: number
  // status:
  // order_type:

  constructor(order: OrderType) {
    this._id = order._id || new ObjectId()
    this.customer_id = order.customer_id
    this.order_date = order.order_date
    this.total_amount = order.total_amount
  }
}
