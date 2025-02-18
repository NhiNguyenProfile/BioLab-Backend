export interface CreateBrandReqBody {
  brand_name: string
  image_url: string
}

export interface UpdateBrandReqBody {
  brand_name?: string
  image_url?: string
}
