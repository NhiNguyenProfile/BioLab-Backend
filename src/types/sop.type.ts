import { ObjectId } from 'mongodb'
import { ProductType } from './product.type'

interface SOPType {
  _id: ObjectId
  name: string
  description: string
  combo: ProductType[]
}

export { SOPType }
