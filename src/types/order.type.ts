import { ObjectId } from 'mongodb'

interface OrderType {
  _id?: ObjectId
  customer_id: ObjectId
  order_date: Date
  total_amount: number
}

export { OrderType }
