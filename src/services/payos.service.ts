import PayOS from '@payos/node'

const payOSClient = new PayOS(process.env.PAYOS_CLIENT_ID!, process.env.PAYOS_API_KEY!, process.env.PAYOS_CHECKSUM_KEY!)

export const payOSService = {
  async createPaymentLink(orderData: any) {
    try {
      const response = await payOSClient.createPaymentLink(orderData)
      return response
    } catch (error) {
      console.error('Lỗi tạo link thanh toán:', error)
      throw new Error('Không thể tạo link thanh toán.')
    }
  },

  verifyPaymentWebhookData(data: any) {
    return payOSClient.verifyPaymentWebhookData(data)
  }
}
