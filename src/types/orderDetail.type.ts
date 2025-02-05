import { ObjectId } from 'mongodb'

interface OrderDetailType {
  order_detail_id?: ObjectId
  order_id: ObjectId
  product_id: ObjectId
  quantity: number
  subtotal: number
}

export { OrderDetailType }
