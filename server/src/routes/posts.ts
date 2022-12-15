import express from 'express'
import auth from '../middlewares/auth'
import createPost from '../controllers/posts/createPost'
import getAllPosts from '../controllers/posts/getAllPosts'
import setLikes from '../controllers/posts/setLikes'
import getPersonalPosts from '../controllers/posts/getPersonalPosts'
import deletePost from '../controllers/posts/deletePost'


const router = express.Router()

router.post('/create', auth, createPost)
router.get('/all', auth, getAllPosts)
router.get('/personal', auth, getPersonalPosts)
router.post('/setlike', auth, setLikes)
router.delete('/delete/:idToDelete', auth, deletePost)

export default router