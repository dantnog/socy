import { Request, Response } from 'express'
import mongoose from 'mongoose'
import Post from '../../models/PostModel'
import Comment from '../../models/CommentModel'


async function deleteComment(req: Request, res: Response) {
  const {commentId, idToDelete} = req.params

  try {
    const comment = await Comment.findById(commentId)
    if (!comment) return res.status(404).json({message: 'Not found'})

    let realOwner = false
    let comments = Object(comment.comments)
    for (let each of comments) {
      if (String(each._id) === idToDelete && String(each.user_id) === req.headers.userId) {
        realOwner = true
        break
      }
    }
    if (!realOwner) return res.status(403).json({message: 'Permission denied'}) 

    await Comment.findByIdAndUpdate(
      commentId,
      {
        $pull: {
          comments: {_id: new mongoose.Types.ObjectId(idToDelete)}
        }
      }
    )

    const post = await Post.findById(comment?.post_id)
    await post?.update({
      $set: {commentsCount: post.commentsCount - 1}
    })

    res.status(200).json({message: 'Comment deleted'})
  } catch(err) {
    console.log(err)
    res.status(500).json({message: 'Failed to delete post\nTry again later'})
  }
}


export default deleteComment
