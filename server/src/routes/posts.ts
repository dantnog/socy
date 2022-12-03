import express from 'express'
import auth from '../middlewares/auth'
import createPost from '../controllers/posts/createPost'


const router = express.Router()

router.post('/create', auth, createPost)

export default router
