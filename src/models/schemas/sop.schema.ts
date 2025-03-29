import { ProductType } from '~/types/product.type'
import { SOPType } from '~/types/sop.type'
import { ObjectId } from 'mongodb'

export default class SOP {
  _id: ObjectId
  name: string
  description: string
  image_url: string
  combo: ProductType[]

  constructor(sop: SOPType) {
    this._id = sop._id || new ObjectId()
    this.name = sop.name
    this.description = sop.description
    this.image_url = sop.image_url
    this.combo = sop.combo || []
  }
}