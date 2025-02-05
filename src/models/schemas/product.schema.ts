import { ObjectId } from 'mongodb'
import { ProductType } from '~/types/product.type'
import { CategoryType } from '~/types/category.type'

export default class Product {
  private product_id: ObjectId
  private name: string
  private description?: string
  private price: number
  private stock: number
  private category?: CategoryType[]
  private image_url?: string

  constructor(product: ProductType) {
    this.product_id = product.product_id || new ObjectId()
    this.name = product.name
    this.description = product.description
    this.price = product.price
    this.stock = product.stock
    this.category = product.category
    this.image_url = product.image_url
  }

  public getProductId(): ObjectId {
    return this.product_id
  }

  public getName(): string {
    return this.name
  }

  public getDescription(): string | undefined {
    return this.description
  }

  public getPrice(): number {
    return this.price
  }

  public getStock(): number {
    return this.stock
  }

  public getCategory(): CategoryType[] | undefined {
    return this.category
  }

  public getImageUrl(): string | undefined {
    return this.image_url
  }

  public setName(name: string): void {
    this.name = name
  }

  public setDescription(description: string): void {
    this.description = description
  }

  public setPrice(price: number): void {
    this.price = price
  }

  public setStock(stock: number): void {
    this.stock = stock
  }

  public setCategory(category: CategoryType[]): void {
    this.category = category
  }

  public setImageUrl(image_url: string): void {
    this.image_url = image_url
  }
}
