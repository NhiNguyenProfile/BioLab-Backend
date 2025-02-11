import { ObjectId } from 'mongodb'
import { ProductType, QAType } from '~/types/product.type'
import { CategoryType } from '~/types/category.type'

export default class Product {
  _id: ObjectId
  name: string
  description?: string
  price: number
  stock: number
  category?: CategoryType[]
  image_url?: string[]
  qa?: QAType[]

  constructor(product: ProductType) {
    this._id = product._id || new ObjectId()
    this.name = product.name
    this.description = product.description
    this.price = product.price
    this.stock = product.stock
    this.category = product.category
    this.image_url = product.image_url
    this.qa = product.qa
  }
}
