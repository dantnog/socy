import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import usersRoutes from './routes/users'


const app = express()

app.use(express.urlencoded({limit: '30mb', extended: true}))
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use('/users', usersRoutes)

app.listen(5000, () => {
  console.log('SERVER RUNNING ON PORT 5000')
})