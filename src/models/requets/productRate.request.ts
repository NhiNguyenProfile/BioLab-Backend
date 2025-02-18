export interface CreateProductRateReqBody {
  userId: string
  productId: string
  content: string
  rate: number
}

export interface UpdateProductRateReqBody {
  content?: string
  rate?: number
}
