import express from 'express'
import deleteUser from '../controllers/users/deleteUser'
import fetchFollowing from '../controllers/users/fetchFollowing'
import loginUser from '../controllers/users/loginUser'
import logoutUser from '../controllers/users/logoutUser'
import searchUser from '../controllers/users/searchUser'
import setFollowing from '../controllers/users/setFollowing'
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
router.post('/search', auth, searchUser)
router.post('/fetchfollowing', auth, fetchFollowing)
router.post('/setfollowing', auth, setFollowing)

export default router