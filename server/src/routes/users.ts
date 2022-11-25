import express from 'express'
import loginUser from '../controllers/users/loginUser'
import signupUser from '../controllers/users/signupUser'


const router = express.Router()

router.post('/signup', signupUser)
router.post('/login', loginUser)

export default router