import { ObjectId } from 'mongodb'
import { OrderDetailType } from '~/types/orderDetail.type'

export default class OrderDetail {
  _id: ObjectId
  order_id: ObjectId
  product_id: ObjectId
  quantity: number
  subtotal: number

  constructor(orderDetail: OrderDetailType) {
    this._id = orderDetail._id || new ObjectId()
    this.order_id = orderDetail.order_id
    this.product_id = orderDetail.product_id
    this.quantity = orderDetail.quantity
    this.subtotal = orderDetail.subtotal
  }
}
