import { Collection, Db, MongoClient, ServerApiVersion } from 'mongodb'
import { config } from 'dotenv'
import User from '~/models/schemas/user.schema'
import RefreshToken from '~/models/schemas/refreshToken.schema'
import Product from '~/models/schemas/product.schema'
import ProductDetail from '~/models/schemas/productDetail.schema'
import Category from '~/models/schemas/category.schema'
import Order from '~/models/schemas/order.schema'
import OrderDetail from '~/models/schemas/orderDetail.schema'
import ProductRate from '~/models/schemas/productRate.schema'
import Brand from '~/models/schemas/brand.schema'
import PostCategory from '~/models/schemas/postCategory.schema'
import Post from '~/models/schemas/post.schema'
import SOP from '~/models/schemas/sop.schema'

// Using env
config()

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.v5ouu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    })
    this.db = this.client.db(process.env.DB_NAME)
  }
  async connect() {
    try {
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log('Error', error)
      throw error
    }
  }

  get users(): Collection<User> {
    return databaseService.db.collection(process.env.DB_USER_COLLECTION as string)
  }

  get refreshTokens(): Collection<RefreshToken> {
    return databaseService.db.collection(process.env.DB_REFRESH_TOKEN_COLLECTION as string)
  }

  get products(): Collection<Product> {
    return databaseService.db.collection(process.env.DB_PRODUCT_COLLECTION as string)
  }

  get productDetails(): Collection<ProductDetail> {
    return databaseService.db.collection(process.env.DB_PRODUCT_DETAIL_COLLECTION as string)
  }

  get productRates(): Collection<ProductRate> {
    return databaseService.db.collection(process.env.DB_PRODUCT_RATE_COLLECTION as string)
  }

  get categories(): Collection<Category> {
    return databaseService.db.collection(process.env.DB_CATEGORY_COLLECTION as string)
  }

  get orders(): Collection<Order> {
    return databaseService.db.collection(process.env.DB_ORDER_COLLECTION as string)
  }

  get orderDetails(): Collection<OrderDetail> {
    return databaseService.db.collection(process.env.DB_ORDER_DETAIL_COLLECTION as string)
  }

  get brands(): Collection<Brand> {
    return databaseService.db.collection(process.env.DB_BRAND_COLLECTION as string)
  }

  get posts(): Collection<Post> {
    return databaseService.db.collection(process.env.DB_POST_COLLECTION as string)
  }

  get postCategories(): Collection<PostCategory> {
    return databaseService.db.collection(process.env.DB_POST_CATEGORY_COLLECTION as string)
  }

  get sops(): Collection<SOP> {
    return databaseService.db.collection(process.env.DB_SOP_COLLECTION as string)
  }
}

const databaseService = new DatabaseService()
export default databaseService
