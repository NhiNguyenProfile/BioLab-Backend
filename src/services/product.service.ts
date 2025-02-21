import { ObjectId } from 'mongodb'
import Product from '~/models/schemas/product.schema'
import { ProductType } from '~/types/product.type'
import databaseService from './database.service'
import { CreateProductReqBody } from '~/models/requets/product.request'

class ProductService {
  constructor() {}

  async createProduct(payload: CreateProductReqBody) {
    const newProduct = new Product({
      _id: new ObjectId(),
      ...payload
    })

    const result = await databaseService.products.insertOne(newProduct)
    return {
      product_id: result.insertedId,
      message: 'Product created successfully'
    }
  }

  async getProductById(productId: string) {
    if (!ObjectId.isValid(productId)) throw new Error('Invalid product ID format')

    const product = await databaseService.products.findOne({ _id: new ObjectId(productId) })
    if (!product) throw new Error('Product not found!')
    return product
  }

  async updateProduct(productId: string, updateData: Partial<ProductType>) {
    if (!ObjectId.isValid(productId)) throw new Error('Invalid product ID format')

    const result = await databaseService.products.findOneAndUpdate(
      { _id: new ObjectId(productId) },
      { $set: updateData },
      { returnDocument: 'after' }
    )
    if (!result) throw new Error('Product not found or update failed!')
    return result
  }

  async deleteProduct(productId: string) {
    if (!ObjectId.isValid(productId)) throw new Error('Invalid product ID format')

    const result = await databaseService.products.deleteOne({ _id: new ObjectId(productId) })
    if (result.deletedCount === 0) throw new Error('Product not found or already deleted!')
    return { message: 'Product deleted successfully' }
  }

  async getAllProducts() {
    return await databaseService.products.find({}).toArray()
  }
}

const productService = new ProductService()
export default productService
