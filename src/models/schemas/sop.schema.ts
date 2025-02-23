import { ProductType } from '~/types/product.type'
import { SOPType } from '~/types/sop.type'
import { ObjectId } from 'mongodb'

export default class SOP {
  _id: ObjectId
  name: string
  description: string
  combo: ProductType[]

  constructor(sop: SOPType) {
    this._id = sop._id
    this.name = sop.name
    this.description = sop.description
    this.combo = sop.combo
  }
}
