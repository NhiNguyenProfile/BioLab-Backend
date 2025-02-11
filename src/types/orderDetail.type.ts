import { ObjectId } from 'mongodb'

interface OrderDetailType {
  _id?: ObjectId
  order_id: ObjectId
  product_id: ObjectId
  quantity: number
  subtotal: number
}

export { OrderDetailType }
