import { ObjectId } from 'mongodb'
import SOP from '~/models/schemas/sop.schema'
import { SOPType } from '~/types/sop.type'
import databaseService from './database.service'
import { CreateSOPReqBody, UpdateSOPReqBody } from '~/models/requets/sop.request'
import productService from './product.service'

class SOPService {
  constructor() {}

  async createSOP(payload: CreateSOPReqBody) {
    const productIds = payload.combo.map((id) => new ObjectId(id))

    const products = (await databaseService.products
      .find({
        _id: { $in: productIds }
      })
      .toArray()) as any[]

    const newSOP = new SOP({
      name: payload.name,
      description: payload.description,
      image_url: payload.image_url,
      combo: products
    })

    const result = await databaseService.sops.insertOne(newSOP)
    return {
      sop_id: result.insertedId,
      message: 'SOP created successfully'
    }
  }

  async getSOPById(sopId: string) {
    if (!ObjectId.isValid(sopId)) throw new Error('Invalid SOP ID format')

    const sop = await databaseService.sops.findOne({ _id: new ObjectId(sopId) })
    if (!sop) throw new Error('SOP not found!')
    return sop
  }

  async updateSOP(sopId: string, updateData: UpdateSOPReqBody) {
    if (!ObjectId.isValid(sopId)) throw new Error('Invalid SOP ID format')

    const result = await databaseService.sops.findOneAndUpdate(
      { _id: new ObjectId(sopId) },
      { $set: updateData },
      { returnDocument: 'after' }
    )

    if (!result) throw new Error('SOP not found or update failed!')
    return result
  }

  async deleteSOP(sopId: string) {
    if (!ObjectId.isValid(sopId)) throw new Error('Invalid SOP ID format')

    const result = await databaseService.sops.deleteOne({ _id: new ObjectId(sopId) })
    if (result.deletedCount === 0) throw new Error('SOP not found or already deleted!')

    return { message: 'SOP deleted successfully' }
  }

  async getAllSOPs() {
    return await databaseService.sops.find({}).toArray()
  }

  async addProductToSOP(sopId: string, productId: string) {
    if (!ObjectId.isValid(sopId)) throw new Error('Invalid SOP ID format')
    if (!ObjectId.isValid(productId)) throw new Error('Invalid product ID format')

    const product = await productService.getProductById(productId)

    const sop = await this.getSOPById(sopId)
    const existingProduct = sop.combo.find((item) => item && item._id && item._id.toString() === productId)

    if (existingProduct) {
      throw new Error('Product already exists in the combo')
    }

    const result = await databaseService.sops.findOneAndUpdate(
      { _id: new ObjectId(sopId) },
      { $push: { combo: product } },
      { returnDocument: 'after' }
    )

    if (!result) throw new Error('SOP not found or update failed!')
    return result
  }

  async removeProductFromSOP(sopId: string, productId: string) {
    if (!ObjectId.isValid(sopId)) throw new Error('Invalid SOP ID format')
    if (!ObjectId.isValid(productId)) throw new Error('Invalid product ID format')

    const result = await databaseService.sops.findOneAndUpdate(
      { _id: new ObjectId(sopId) },
      { $pull: { combo: { _id: new ObjectId(productId) } } },
      { returnDocument: 'after' }
    )

    if (!result) throw new Error('SOP not found, product not in combo, or update failed!')
    return result
  }
}

const sopService = new SOPService()
export default sopService
