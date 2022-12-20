import { Request, Response } from 'express'
import Comment from '../../models/CommentModel'
import mongoose from 'mongoose'


async function getComments(req: Request, res: Response) {
  const {commentsId} = req.params

  try {
    const comments = await Comment.aggregate([{
      $match: {_id: new mongoose.Types.ObjectId(commentsId)},
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
        'owner.updatedAt'
      ]
    }]).limit(1)

    res.status(200).json({message: 'Successfully fetched comments', data: comments})
  } catch(err) {
    console.log(err)
    res.status(500).json({message: 'Failed to fetch the comments\nTry again later'})
  }
}

export default getComments



