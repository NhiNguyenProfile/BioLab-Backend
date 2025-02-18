import express, { NextFunction, Request, Response } from 'express'
import userRouter from '~/routes/user.routes'
import databaseService from '~/services/database.service'
import { defaultErrorHandler } from './middlewares/error.middleware'
import productRouter from './routes/product.routes'
import categoryRouter from './routes/category.routes'
import brandRouter from './routes/brand.routes'
import swaggerJSDoc from 'swagger-jsdoc'
const swaggerUi = require('swagger-ui-express')

const app = express()
const port = 3000

app.use(express.json())
app.use('/brands', brandRouter)
app.use('/users', userRouter)
app.use('/categories', categoryRouter)
app.use('/products', productRouter)

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

app.use(defaultErrorHandler)
databaseService.connect()

// ~ run().catch(err => console.dir(err))
app.listen(port, () => {
  console.log(`Listen on port ${port}...`)
})
