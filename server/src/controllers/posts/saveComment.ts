import { Request, Response } from 'express'
import Post from '../../models/PostModel'
import Comment from '../../models/CommentModel'
import mongoose from 'mongoose'


async function saveComment(req: Request, res: Response) {
  const {post_id, comment} = req.body

  try {
    const post = await Post.findById(post_id)
    if (!post) return res.status(404).json({message: 'Post not found'})

    if (!post.comments_id) {
      // first comment
      const newComment = await Comment.create({
        post_id: new mongoose.Types.ObjectId(post_id as string),
        comments: [{
          user_id: new mongoose.Types.ObjectId(req.headers.userId as string),
          comment: comment
        }]
      })

      await post.update({
        comments_id: newComment._id,
        $set: {commentsCount: post.commentsCount + 1}
      },{
        new: true
      })
    } else {
      // new comment
      const newComment = await Comment.findById(post.comments_id)

      await newComment?.update({
        $push: {
          comments: {
            user_id: new mongoose.Types.ObjectId(req.headers.userId as string),
            comment: comment
          }
        }
      })

      await post.update({
        $set: {commentsCount: post.commentsCount + 1}
      },{
        new: true
      })
    }

    const comments = await Comment.aggregate([{
        $match: {_id: post.comments_id}
      },{
        $lookup: {
          from: 'users',
          localField: 'comments.user_id',
          foreignField: '_id',
          as: 'owner'
        }
      },{
        $unset: [
          'owner.email',
          'owner.password',
          'owner.createdAt',
          'owner.updatedAt',
          'owner.followlist_id',
          'owner.likeslist_id',
          'owner.location',
          'owner.description',
        ]
      }
    ]).limit(1)

    console.log(comments)
    res.status(201).json({message: 'Comment saved', data: comments})

    console.log(`[${new Date(Date.now()).toLocaleTimeString()}] [COMMENT SAVE] Complete. Returning comments.`)
  } catch(err) {
    console.log(err)
    res.status(500).json({message: 'Failed to save the comment\nTry again later'})
  }
}

export default saveComment


