import express, { NextFunction, Request, Response } from 'express'
import userRouter from '~/routes/user.routes'
import databaseService from '~/services/database.service'
import { defaultErrorHandler } from './middlewares/error.middleware'
import productRouter from './routes/product.routes'
import categoryRouter from './routes/category.routes'
import brandRouter from './routes/brand.routes'

const app = express()
const port = 3000

app.use(express.json())
app.use('/brands', brandRouter)
app.use('/users', userRouter)
app.use('/categories', categoryRouter)
app.use('/products', productRouter)

app.use(defaultErrorHandler)
databaseService.connect()
// ~ run().catch(err => console.dir(err))
app.listen(port, () => {
  console.log(`Listen on port ${port}...`)
})
