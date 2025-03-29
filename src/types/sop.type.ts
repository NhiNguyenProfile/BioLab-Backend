import { ProductType } from './product.type'
import { ObjectId } from 'mongodb'

export interface SOPType {
  _id?: ObjectId
  name: string
  description: string
  image_url: string
  combo: ProductType[]
}

export enum SOPStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}
