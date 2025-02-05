import { ObjectId } from 'mongodb'

interface OrderType {
  order_id?: ObjectId
  customer_id: ObjectId
  order_date: Date
  total_amount: number
}

export { OrderType }
