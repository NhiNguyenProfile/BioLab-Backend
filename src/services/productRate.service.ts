import { ObjectId } from 'mongodb'
import ProductRate from '~/models/schemas/productRate.schema'
import databaseService from './database.service'
import { CreateProductRateReqBody, UpdateProductRateReqBody } from '~/models/requets/productRate.request'

class ProductRateService {
  constructor() {}

  async createProductRate(payload: CreateProductRateReqBody) {
    if (!ObjectId.isValid(payload.userId) || !ObjectId.isValid(payload.productId)) {
      throw new Error('Invalid user ID or product ID format')
    }

    const newProductRate = new ProductRate({
      userId: new ObjectId(payload.userId),
      productId: new ObjectId(payload.productId),
      content: payload.content,
      rate: payload.rate
    })

    const result = await databaseService.productRates.insertOne(newProductRate)
    return {
      product_rate_id: result.insertedId,
      message: 'Product rate created successfully'
    }
  }

  async getProductRateById(productRateId: string) {
    if (!ObjectId.isValid(productRateId)) throw new Error('Invalid product rate ID format')

    const productRate = await databaseService.productRates.findOne({ _id: new ObjectId(productRateId) })
    if (!productRate) throw new Error('Product rate not found!')
    return productRate
  }

  async updateProductRate(productRateId: string, updateData: Partial<UpdateProductRateReqBody>) {
    if (!ObjectId.isValid(productRateId)) throw new Error('Invalid product rate ID format')

    const result = await databaseService.productRates.findOneAndUpdate(
      { _id: new ObjectId(productRateId) },
      { $set: updateData },
      { returnDocument: 'after' }
    )
    if (!result) throw new Error('Product rate not found or update failed!')
    return result
  }

  async deleteProductRate(productRateId: string) {
    if (!ObjectId.isValid(productRateId)) throw new Error('Invalid product rate ID format')

    const result = await databaseService.productRates.deleteOne({ _id: new ObjectId(productRateId) })
    if (result.deletedCount === 0) throw new Error('Product rate not found or already deleted!')
    return { message: 'Product rate deleted successfully' }
  }

  async getAllProductRates(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit
    const productRates = await databaseService.productRates.find({}).skip(skip).limit(limit).toArray()

    const total = await databaseService.productRates.countDocuments()
    return {
      data: productRates,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }
  }
}

const productRateService = new ProductRateService()
export default productRateService
