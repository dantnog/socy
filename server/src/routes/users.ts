import express from 'express'
import signinUser from '../controllers/users/signinUser'


const router = express.Router()

router.post('/signin', signinUser)

export default router