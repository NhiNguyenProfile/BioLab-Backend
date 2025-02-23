import { ObjectId } from 'mongodb'
import databaseService from './database.service'
import { BrandType } from '~/types/brand.type'
import { CreateBrandReqBody, UpdateBrandReqBody } from '~/models/requets/brand.request'

class BrandService {
  constructor() {}

  async createBrand(payload: CreateBrandReqBody) {
    const newBrand: BrandType = {
      _id: new ObjectId(),
      brand_name: payload.brand_name,
      image_url: payload.image_url
    }

    const result = await databaseService.brands.insertOne(newBrand)
    return {
      brand_id: result.insertedId,
      message: 'Brand created successfully'
    }
  }

  async getBrandById(brandId: string) {
    if (!ObjectId.isValid(brandId)) throw new Error('Invalid brand ID format')

    const brand = await databaseService.brands.findOne({ _id: new ObjectId(brandId) })
    if (!brand) throw new Error('Brand not found!')
    return brand
  }

  async updateBrand(brandId: string, updateData: Partial<UpdateBrandReqBody>) {
    if (!ObjectId.isValid(brandId)) throw new Error('Invalid brand ID format')

    const result = await databaseService.brands.findOneAndUpdate(
      { _id: new ObjectId(brandId) },
      { $set: updateData },
      { returnDocument: 'after' }
    )
    if (!result) throw new Error('Brand not found or update failed!')
    return result
  }

  async deleteBrand(brandId: string) {
    if (!ObjectId.isValid(brandId)) throw new Error('Invalid brand ID format')

    const result = await databaseService.brands.deleteOne({ _id: new ObjectId(brandId) })
    if (result.deletedCount === 0) throw new Error('Brand not found or already deleted!')
    return { message: 'Brand deleted successfully' }
  }

  async getAllBrands() {
    return await databaseService.brands.find({}).toArray()
  }

  async getBrandFeatured(brandId: string) {
    if (!ObjectId.isValid(brandId)) throw new Error('Invalid brand ID format')
    const brand = await databaseService.brands.findOne({ _id: new ObjectId(brandId) })
    if (!brand) throw new Error('Brand not found!')
    const feature = await databaseService.products.findOne({ 'brand._id': brandId })
    return feature
  }
}

const brandService = new BrandService()
export default brandService
