import { BrandType } from '~/types/brand.type'
import { CategoryType } from '~/types/category.type'
import { Detail, QAType } from '~/types/product.type'

export interface CreateProductReqBody {
  name: string
  description: string
  category: CategoryType[]
  image_url: string[]
  brand: BrandType
  qa: QAType[]
  unit: string
  price: number
  stock: number
  details?: Detail[]
}

export interface UpdateProductReqBody {
  name: string
  description: string
  category: CategoryType[]
  image_url: string[]
  brand: BrandType
  qa: QAType[]
}
