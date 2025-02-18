import express, { NextFunction, Request, Response } from 'express'
import userRouter from '~/routes/user.routes'
import postRouter from '~/routes/post.routes'
import databaseService from '~/services/database.service'
import { defaultErrorHandler } from './middlewares/error.middleware'

const app = express()
const port = 3000

app.use(express.json())
app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use(defaultErrorHandler)
databaseService.connect()
// ~ run().catch(err => console.dir(err))
app.listen(port, () => {
  console.log(`Listen on port ${port}...`)
})
