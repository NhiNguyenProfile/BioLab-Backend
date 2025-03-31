import express, { NextFunction, Request, Response } from 'express'
import userRouter from '~/routes/user.routes'
import postRouter from '~/routes/post.routes'
import databaseService from '~/services/database.service'
import { defaultErrorHandler } from './middlewares/error.middleware'
import productRouter from './routes/product.routes'
import categoryRouter from './routes/category.routes'
import brandRouter from './routes/brand.routes'
import swaggerJSDoc from 'swagger-jsdoc'
import cors from 'cors'
import postCategoryRouter from './routes/postCategory.routes'
import orderRouter from './routes/order.routes'
import orderDetailRouter from './routes/orderDetail.routes'
import paymentRouter from './routes/payment.routes'
import sopRouter from './routes/sop.routes'
import sopOrderRouter from './routes/sopOrder.routes'
import cron from 'node-cron'
import pendingOrderService from './services/pendingOrder.service'

const swaggerUi = require('swagger-ui-express')

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())
app.use('/brands', brandRouter)
app.use('/users', userRouter)
app.use('/categories', categoryRouter)
app.use('/post-categories', postCategoryRouter)
app.use('/posts', postRouter)
app.use('/products', productRouter)
app.use('/orders', orderRouter)
app.use('/order-details', orderDetailRouter)
app.use('/payments', paymentRouter)
app.use('/sops', sopRouter)
app.use('/sop-orders', sopOrderRouter)

// Configure the app to use Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'My Express.js API',
      version: '1.0.0',
      description: 'A sample Express.js API built with TypeScript and Swagger'
    }
  },
  apis: ['./src/routes/*.ts']
}
const swaggerDocs = swaggerJSDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

cron.schedule('0 * * * *', async () => {
  try {
    const cleanedCount = await pendingOrderService.cleanupExpiredOrders()
    console.log(`${new Date().toISOString()}: Cleaned up ${cleanedCount} expired pending orders`)
  } catch (error) {
    console.error('Error cleaning up expired orders:', error)
  }
})

app.use(defaultErrorHandler)
databaseService.connect()

// ~ run().catch(err => console.dir(err))
app.listen(port, () => {
  console.log(`Listen on port ${port}...`)
})
