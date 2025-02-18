import { ObjectId } from 'mongodb'

export interface CreateOrderDetailReqBody {
  order_id: string
  product_id: string
  quantity: number
  subtotal: number
}

export interface UpdateOrderDetailReqBody {
  quantity?: number
  subtotal?: number
}
