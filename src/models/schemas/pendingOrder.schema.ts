import { ObjectId } from 'mongodb'

export default class PendingOrder {
  _id: ObjectId
  orderCode: number
  order_id: ObjectId  
  order_sop_detail_id: ObjectId 
  sop_id: ObjectId
  created_at: Date
  expires_at: Date

  constructor(pendingOrder: any) {
    this._id = pendingOrder._id || new ObjectId()
    this.orderCode = pendingOrder.orderCode
    this.order_id = pendingOrder.order_id
    this.order_sop_detail_id = pendingOrder.order_sop_detail_id
    this.sop_id = pendingOrder.sop_id
    this.created_at = pendingOrder.created_at || new Date()
    
    const expiryDate = new Date()
    expiryDate.setHours(expiryDate.getHours() + 24)
    this.expires_at = pendingOrder.expires_at || expiryDate
  }
}