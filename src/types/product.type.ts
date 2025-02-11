import { ObjectId } from 'mongodb'
import { CategoryType } from './category.type'

interface ProductType {
  _id?: ObjectId
  name: string
  description?: string
  price: number
  stock: number
  category?: CategoryType[]
  image_url?: string[]
  qa?: QAType[]
}

type QAType = {
  question: string
  answer: string
}

export { ProductType, QAType }
