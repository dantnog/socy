import express from 'express'
import loginUser from '../controllers/users/loginUser'
import logoutUser from '../controllers/users/logoutUser'
import signupUser from '../controllers/users/signupUser'
import imageUpload from '../middlewares/storeImages'


const router = express.Router()

router.post('/signup', imageUpload.single('image'), signupUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)

export default router