import { ObjectId } from 'mongodb'
import { OrderType } from '~/types/order.type'

export default class Order {
  private order_id: ObjectId
  private customer_id: ObjectId
  private order_date: Date
  private total_amount: number

  constructor(order: OrderType) {
    this.order_id = order.order_id || new ObjectId()
    this.customer_id = order.customer_id
    this.order_date = order.order_date
    this.total_amount = order.total_amount
  }

  public getOrderId(): ObjectId {
    return this.order_id
  }

  public getCustomerId(): ObjectId {
    return this.customer_id
  }

  public getOrderDate(): Date {
    return this.order_date
  }

  public getTotalAmount(): number {
    return this.total_amount
  }

  public setCustomerId(customer_id: ObjectId): void {
    this.customer_id = customer_id
  }

  public setOrderDate(order_date: Date): void {
    this.order_date = order_date
  }

  public setTotalAmount(total_amount: number): void {
    this.total_amount = total_amount
  }
}
