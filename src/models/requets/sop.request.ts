import { ObjectId } from 'mongodb'

export interface CreateSOPReqBody {
  name: string
  description: string
  image_url: string
  combo: string[] 
}

export interface UpdateSOPReqBody {
  name?: string
  description?: string
  image_url?: string
}

export interface AddProductToSOPReqBody {
  product_id: string
}

export interface RemoveProductFromSOPReqBody {
  product_id: string
}