export interface CreateProductDetailReqBody {
  product_id: string
  unit: string
  price: number
  stock: number
}

export interface UpdateProductDetailReqBody {
  unit?: string
  price?: number
  stock?: number
}
