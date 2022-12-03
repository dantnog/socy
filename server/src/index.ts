import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import usersRoutes from './routes/users'
import postsRoutes from './routes/posts'


export const app = express()

app.use(express.urlencoded({limit: '30mb', extended: true}))
app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser())
app.use(cors())

app.use('/users', usersRoutes)
app.use('/posts', postsRoutes)

app.listen(5000, () => {
  console.log('SERVER RUNNING ON PORT 5000')
})
