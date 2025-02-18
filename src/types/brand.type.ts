import { ObjectId } from 'mongodb'

interface BrandType {
  _id: ObjectId
  brand_name: string
  image_url: string
}

export { BrandType }
