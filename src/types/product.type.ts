import { ObjectId } from 'mongodb'
import { CategoryType } from './category.type'
import { BrandType } from './brand.type'

interface ProductType {
  _id?: ObjectId
  name: string
  description?: string
  category?: CategoryType[]
  image_url?: string[]
  brand: BrandType
  qa?: QAType[]
  unit: string
  price: number
  stock: number
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

export { ProductType, QAType, Detail }
