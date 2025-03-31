import { ObjectId } from 'mongodb'
import PendingOrder from '~/models/schemas/pendingOrder.schema'
import databaseService from './database.service'

class PendingOrderService {
  async createPendingOrder(pendingOrder: any) {
    const result = await databaseService.pendingOrders.insertOne(
      new PendingOrder(pendingOrder)
    )
    return {
      pending_order_id: result.insertedId,
      orderCode: pendingOrder.orderCode
    }
  }

  async getPendingOrderByCode(orderCode: number) {
    const pendingOrder = await databaseService.pendingOrders.findOne({
      orderCode,
      expires_at: { $gt: new Date() }  
    })
    return pendingOrder
  }

  async deletePendingOrder(orderCode: number) {
    await databaseService.pendingOrders.deleteOne({ orderCode })
  }
  
  async cleanupExpiredOrders() {
    const result = await databaseService.pendingOrders.deleteMany({
      expires_at: { $lt: new Date() }
    })
    console.log(`Cleaned up ${result.deletedCount} expired pending orders`)
    return result.deletedCount
  }
}

const pendingOrderService = new PendingOrderService()
export default pendingOrderService