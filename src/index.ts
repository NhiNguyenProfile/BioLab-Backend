import express from 'express'
import userRouter from '~/routes/user.routes'
import databaseService from '~/services/database.service'

const app = express()
const port = 3000

app.use(express.json())
app.use('/user', userRouter)
databaseService.connect()
// ~ run().catch(err => console.dir(err))
app.listen(port, () => {
  console.log(`Listen on port ${port}...`)
})
