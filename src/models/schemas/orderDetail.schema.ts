import { ObjectId } from 'mongodb'
import { OrderDetailType } from '~/types/orderDetail.type'

export default class OrderDetail {
  private order_detail_id: ObjectId
  private order_id: ObjectId
  private product_id: ObjectId
  private quantity: number
  private subtotal: number

  constructor(orderDetail: OrderDetailType) {
    this.order_detail_id = orderDetail.order_detail_id || new ObjectId()
    this.order_id = orderDetail.order_id
    this.product_id = orderDetail.product_id
    this.quantity = orderDetail.quantity
    this.subtotal = orderDetail.subtotal
  }

  public getOrderDetailId(): ObjectId {
    return this.order_detail_id
  }

  public getOrderId(): ObjectId {
    return this.order_id
  }

  public getProductId(): ObjectId {
    return this.product_id
  }

  public getQuantity(): number {
    return this.quantity
  }

  public getSubtotal(): number {
    return this.subtotal
  }

  public setOrderId(order_id: ObjectId): void {
    this.order_id = order_id
  }

  public setProductId(product_id: ObjectId): void {
    this.product_id = product_id
  }

  public setQuantity(quantity: number): void {
    this.quantity = quantity
  }

  public setSubtotal(subtotal: number): void {
    this.subtotal = subtotal
  }
}
