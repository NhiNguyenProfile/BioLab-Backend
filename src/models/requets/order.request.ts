import { OrderStatus, PaymentStatus } from '~/types/order.type'

export interface CreateOrderReqBody {
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

export interface UpdateOrderReqBody {
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
