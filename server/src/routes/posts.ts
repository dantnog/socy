import express from 'express'
import auth from '../middlewares/auth'
import createPost from '../controllers/posts/createPost'
import getAllPosts from '../controllers/posts/getAllPosts'


const router = express.Router()

router.post('/create', auth, createPost)
router.get('/all', auth, getAllPosts)

export default router
