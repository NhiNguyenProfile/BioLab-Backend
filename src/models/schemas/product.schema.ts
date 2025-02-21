import { ObjectId } from 'mongodb'
import { Detail, ProductType, QAType } from '~/types/product.type'
import { CategoryType } from '~/types/category.type'
import { BrandType } from '~/types/brand.type'

export default class Product {
  _id: ObjectId
  name: string
  description?: string
  category?: CategoryType
  image_url?: string[]
  brand: BrandType
  qa?: QAType[]
  unit: string
  price: number
  stock: number
  details?: Detail[]

  constructor(product: ProductType) {
    this._id = product._id || new ObjectId()
    this.name = product.name
    this.description = product.description
    this.category = product.category
    this.image_url = product.image_url
    this.brand = product.brand
    this.unit = product.unit
    this.price = product.price
    this.stock = product.stock
    this.details = product.details
    this.qa = product.qa
  }
}
