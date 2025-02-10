import { ObjectId } from 'mongodb'

export default class ProductRate {
  _id: ObjectId
  userId: ObjectId
  productId: ObjectId
  content: string
  createdAt: Date
  rate: number

  constructor(productRate: { userId: ObjectId; productId: ObjectId; content: string; rate: number }) {
    this._id = new ObjectId()
    this.userId = productRate.userId
    this.productId = productRate.productId
    this.content = productRate.content
    this.createdAt = new Date()
    this.rate = productRate.rate
  }
}
