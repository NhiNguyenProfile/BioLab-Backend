import { ObjectId } from 'mongodb'

export interface OrderSOPDetailType {
  _id?: ObjectId
  order_id: ObjectId
  sop_id: ObjectId
  quantity: number
  price: number
  subtotal: number
  sop_snapshot: {
    name: string
    description?: string
    image_url?: string
  }
  products: {
    product_id: ObjectId
    name: string
    price: number
    quantity: number
    image_url?: string
    description?: string
  }[]
}