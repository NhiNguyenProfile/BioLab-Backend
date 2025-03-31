import { ObjectId } from 'mongodb'
import { OrderSOPDetailType } from '~/types/orderSOPDetail.type'
import OrderSOPDetail from '~/models/schemas/orderSOPDetail.schema'
import databaseService from './database.service'
import sopService from './sop.service'
import ErrorMessages from '~/constants/errorMessage'

class OrderSOPDetailService {
  async createOrderSOPDetail(orderSOPDetail: OrderSOPDetailType) {
    const result = await databaseService.orderSOPDetails.insertOne(
      new OrderSOPDetail(orderSOPDetail)
    )
    return {
      order_sop_detail_id: result.insertedId,
      message: 'Order SOP detail created successfully'
    }
  }

  async getOrderSOPDetailByOrderId(orderId: string) {
    if (!ObjectId.isValid(orderId)) throw new Error(ErrorMessages.sopOrder.invalidOrderId)

    const orderSOPDetail = await databaseService.orderSOPDetails.findOne({
      order_id: new ObjectId(orderId)
    })
    
    if (!orderSOPDetail) throw new Error(ErrorMessages.sopOrder.orderDetailNotFound)
    return orderSOPDetail
  }

  async createOrderSOPDetailFromSOP(orderId: string, sopId: string, quantity: number, price: number) {
    if (!ObjectId.isValid(orderId)) throw new Error(ErrorMessages.sopOrder.invalidOrderId)
    if (!ObjectId.isValid(sopId)) throw new Error(ErrorMessages.sopOrder.invalidSopId)

    const sop = await sopService.getSOPById(sopId)
    if (!sop) throw new Error(ErrorMessages.sop.notFound)

    const orderSOPDetail: OrderSOPDetailType = {
      order_id: new ObjectId(orderId),
      sop_id: new ObjectId(sopId),
      quantity: quantity,
      price: price,
      subtotal: price * quantity,
      sop_snapshot: {
        name: sop.name,
        description: sop.description,
        image_url: sop.image_url
      },
      products: sop.combo
        .filter(product => product._id) 
        .map(product => ({
          product_id: new ObjectId(product._id!.toString()), 
          name: product.name,
          price: product.price,
          quantity: 1, 
          image_url: product.image_url && product.image_url.length > 0 
            ? product.image_url[0] 
            : undefined,
          description: product.description
        }))
    }

    return this.createOrderSOPDetail(orderSOPDetail)
  }
}

const orderSOPDetailService = new OrderSOPDetailService()
export default orderSOPDetailService