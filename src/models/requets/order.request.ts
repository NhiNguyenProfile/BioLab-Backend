import { ObjectId } from 'mongodb'

export interface CreateOrderReqBody {
  customer_id: ObjectId
  total_amount: number
}

export interface UpdateOrderReqBody {
  total_amount?: number
}
