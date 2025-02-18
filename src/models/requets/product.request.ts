import { BrandType } from '~/types/brand.type'
import { CategoryType } from '~/types/category.type'
import { QAType } from '~/types/product.type'

export interface CreateProductReqBody {
  name: string
  description: string
  category: CategoryType[]
  image_url: string[]
  brand: BrandType
  qa: QAType[]
}

export interface UpdateProductReqBody {
  name: string
  description: string
  category: CategoryType[]
  image_url: string[]
  brand: BrandType
  qa: QAType[]
}
