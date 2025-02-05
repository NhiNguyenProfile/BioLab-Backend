import { ObjectId } from 'mongodb'
import { CategoryType } from './category.type'

interface ProductType {
  product_id?: ObjectId
  name: string
  description?: string
  price: number
  stock: number
  category?: CategoryType[]
  image_url?: string
}

export { ProductType }
