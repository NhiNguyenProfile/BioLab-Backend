import { ObjectId } from 'mongodb'

interface OrderType {
  _id?: ObjectId
  customer_name: string
  email: string
  phone: string
  order_date: Date
  total_amount: number
  status: OrderStatus
  payment_status: PaymentStatus
  payment_method: string
  address: string
}

enum OrderStatus {
  'PROCESSING',
  'DELIVERED',
  'COMPLETED',
  'CANCELLED'
}

enum PaymentStatus {
  'PAID',
  'UNPAID'
}

export { OrderType, OrderStatus, PaymentStatus }
