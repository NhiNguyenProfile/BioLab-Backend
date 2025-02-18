import { ObjectId } from 'mongodb'
import ProductDetail from '~/models/schemas/productDetail.schema'
import databaseService from './database.service'
import { CreateProductDetailReqBody, UpdateProductDetailReqBody } from '~/models/requets/productDetail.request'

class ProductDetailService {
  constructor() {}

  async createProductDetail(payload: CreateProductDetailReqBody) {
    if (!ObjectId.isValid(payload.product_id)) throw new Error('Invalid product ID format')

    const newProductDetail = new ProductDetail({
      _id: new ObjectId(),
      product_id: new ObjectId(payload.product_id),
      unit: payload.unit,
      price: payload.price,
      stock: payload.stock
    })

    const result = await databaseService.productDetails.insertOne(newProductDetail)
    return {
      product_detail_id: result.insertedId,
      message: 'Product detail created successfully'
    }
  }

  async getProductDetailById(productDetailId: string) {
    if (!ObjectId.isValid(productDetailId)) throw new Error('Invalid product detail ID format')

    const productDetail = await databaseService.productDetails.findOne({ _id: new ObjectId(productDetailId) })
    if (!productDetail) throw new Error('Product detail not found!')
    return productDetail
  }

  async updateProductDetail(productDetailId: string, updateData: Partial<UpdateProductDetailReqBody>) {
    if (!ObjectId.isValid(productDetailId)) throw new Error('Invalid product detail ID format')

    const result = await databaseService.productDetails.findOneAndUpdate(
      { _id: new ObjectId(productDetailId) },
      { $set: updateData },
      { returnDocument: 'after' }
    )
    if (!result) throw new Error('Product detail not found or update failed!')
    return result
  }

  async deleteProductDetail(productDetailId: string) {
    if (!ObjectId.isValid(productDetailId)) throw new Error('Invalid product detail ID format')

    const result = await databaseService.productDetails.deleteOne({ _id: new ObjectId(productDetailId) })
    if (result.deletedCount === 0) throw new Error('Product detail not found or already deleted!')
    return { message: 'Product detail deleted successfully' }
  }

  async getAllProductDetails(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit
    const productDetails = await databaseService.productDetails.find({}).skip(skip).limit(limit).toArray()

    const total = await databaseService.productDetails.countDocuments()
    return {
      data: productDetails,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }
  }
}

const productDetailService = new ProductDetailService()
export default productDetailService
