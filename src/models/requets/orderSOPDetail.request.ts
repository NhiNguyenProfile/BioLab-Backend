import { OrderStatus, PaymentStatus } from '~/types/order.type'

export interface CreateSOPOrderReqBody {
  customer_name: string
  email: string
  phone: string
  payment_method: string
  address: string
  sop_id: string
  quantity: number
  subscription_info?: {
    is_continue?: boolean
    start_date?: string
    duration_months?: number
    delivery_day?: number
  }
}

export interface UpdateSOPOrderStatusReqBody {
  status?: OrderStatus
  payment_status?: PaymentStatus
  subscription_status?: 'active' | 'paused' | 'cancelled' | 'completed'
}
