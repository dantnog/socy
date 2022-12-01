import express from 'express'
import deleteUser from '../controllers/users/deleteUser'
import loginUser from '../controllers/users/loginUser'
import logoutUser from '../controllers/users/logoutUser'
import signupUser from '../controllers/users/signupUser'
import updateUser from '../controllers/users/updateUser'
import auth from '../middlewares/auth'
import imageUpload from '../middlewares/storeImages'


const router = express.Router()

router.post('/signup', imageUpload.single('image'), signupUser)
router.post('/login', loginUser)
router.get('/logout', logoutUser)
router.patch('/update', imageUpload.single('image'), auth, updateUser)
router.delete('/delete', auth, deleteUser)

export default router