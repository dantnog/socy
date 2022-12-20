import express from 'express'
import auth from '../middlewares/auth'
import createPost from '../controllers/posts/createPost'
import getAllPosts from '../controllers/posts/getAllPosts'
import setLikes from '../controllers/posts/setLikes'
import getPersonalPosts from '../controllers/posts/getPersonalPosts'
import deletePost from '../controllers/posts/deletePost'
import saveComment from '../controllers/posts/saveComment'
import getComments from '../controllers/posts/getComments'
import deleteComment from '../controllers/posts/deleteComment'


const router = express.Router()

router.post('/create', auth, createPost)
router.get('/all', auth, getAllPosts)
router.get('/personal', auth, getPersonalPosts)
router.post('/setlike', auth, setLikes)
router.delete('/delete/:idToDelete', auth, deletePost)
router.post('/comments', auth, saveComment)
router.get('/comments/:commentsId', auth, getComments)
router.delete('/comments/:commentId/:idToDelete', auth, deleteComment)

export default router