import { ObjectId } from 'mongodb'

export default class ProductDetail {
  _id: ObjectId
  product_id: ObjectId
  unit: string
  price: number
  stock: number

  constructor(productDetail: { _id: ObjectId; product_id: ObjectId; unit: string; price: number; stock: number }) {
    this._id = productDetail._id || new ObjectId()
    this.product_id = productDetail.product_id
    this.unit = productDetail.unit
    this.price = productDetail.price
    this.stock = productDetail.stock
  }
}
