import { Request, Response } from 'express'
import mongoose from 'mongoose'
import Post from '../../models/PostModel'
import Comment from '../../models/CommentModel'


async function deleteComment(req: Request, res: Response) {
  const {commentId, idToDelete} = req.params

  try {
    const comment = await Comment.findByIdAndUpdate(
      commentId,
      {
        $pull: {
          comments: {_id: new mongoose.Types.ObjectId(idToDelete)}
        }
      })

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
