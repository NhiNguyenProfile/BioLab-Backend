import { ObjectId } from 'mongodb'

export interface OrderType {
  _id?: ObjectId
  customer_name: string
  email: string
  phone: string
  order_date?: Date
  total_amount: number
  status: OrderStatus
  payment_status: PaymentStatus
  payment_method: string
  address: string
  item_type?: OrderItemType 

  subscription_info?: {
    is_continue?: boolean 
    start_date?: Date 
    duration_months?: number 
    delivery_day?: number 
    recurring_total?: number 
    next_delivery_date?: Date 
    subscription_status?: 'active' | 'paused' | 'cancelled' | 'completed'
    deliveries_completed?: number 
    deliveries_remaining?: number 
    last_delivery_date?: Date 
  }
}

export enum OrderItemType {
  PRODUCT = 'product',
  SOP = 'sop'
}

enum OrderStatus {
  PROCESSING = 'PROCESSING',
  DELIVERED = 'DELIVERED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

enum PaymentStatus {
  PAID = 'PAID',
  UNPAID = 'UNPAID'
}

enum PaymentMethod {
  COD = 'COD',
  VNPAY = 'VNPAY'
}

export { OrderStatus, PaymentStatus }
