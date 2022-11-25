import express from 'express'
import loginUser from '../controllers/users/loginUser'
import signinUser from '../controllers/users/signinUser'


const router = express.Router()

router.post('/signin', signinUser)
router.post('/login', loginUser)

export default router