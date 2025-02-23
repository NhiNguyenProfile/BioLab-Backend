import { ObjectId } from 'mongodb'
import { CategoryType } from './category.type'
import { BrandType } from './brand.type'

interface ProductType {
  _id?: ObjectId
  name: string
  description?: string
  category?: CategoryType
  image_url?: string[]
  brand: BrandType
  qa?: QAType[]
  unit: string
  price: number
  stock: number
  note: string
  status?: ProductStatus
  details?: Detail[]
}

type Detail = {
  title: string
  content: string
}

type QAType = {
  question: string
  answer: string
}

enum ProductStatus {
  ACTIVE,
  INACTIVE
}

export { ProductType, QAType, Detail, ProductStatus }
