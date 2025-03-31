import { ObjectId } from 'mongodb'
import { OrderSOPDetailType } from '~/types/orderSOPDetail.type'

export default class OrderSOPDetail {
  _id: ObjectId
  order_id: ObjectId
  sop_id: ObjectId
  quantity: number
  price: number
  subtotal: number
  sop_snapshot: {
    name: string
    description?: string
    image_url?: string
  }
  products: {
    product_id: ObjectId
    name: string
    price: number
    quantity: number
    image_url?: string
    description?: string
  }[]

  constructor(orderSOPDetail: OrderSOPDetailType) {
    this._id = orderSOPDetail._id || new ObjectId()
    this.order_id = orderSOPDetail.order_id
    this.sop_id = orderSOPDetail.sop_id
    this.quantity = orderSOPDetail.quantity
    this.price = orderSOPDetail.price
    this.subtotal = orderSOPDetail.subtotal
    this.sop_snapshot = orderSOPDetail.sop_snapshot
    this.products = orderSOPDetail.products
  }
}