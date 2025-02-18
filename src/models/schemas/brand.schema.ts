import { ObjectId } from 'mongodb'
import { BrandType } from '~/types/brand.type'

export default class Brand {
  _id: ObjectId
  brand_name: string
  image_url: string

  constructor(brand: BrandType) {
    this._id = brand._id || new ObjectId()
    this.brand_name = brand.brand_name
    this.image_url = brand.image_url
  }
}
