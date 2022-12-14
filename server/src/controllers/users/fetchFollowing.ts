import { Request, Response } from 'express'
import mongoose from 'mongoose'
import Following from '../../models/FollowingModel'


async function fetchFollowing(req: Request, res: Response) {
  const {followlist_id} = req.body
  if (!followlist_id) return res.status(422).json({message: 'Missing data'})

  try {
    const followList = await Following.aggregate([{
      $match: {_id: new mongoose.Types.ObjectId(followlist_id)}
    },{
      $lookup: {
        from: 'users',
        localField: 'list',
        foreignField: '_id',
        as: 'followedUser'
      }
    },{
      $unset: [
        'followedUser.email',
        'followedUser.password',
        'followedUser.createdAt',
        'followedUser.updatedAt',
      ]
    }]).limit(50)

    res.status(200).json({message: 'Fetch following list complete', data: followList})

    console.log(`[${new Date(Date.now()).toLocaleTimeString()}] [USER FOLLOWING LIST] Complete. Returning list.`)
  } catch(err) {
    console.log(err)
    res.status(500).json({message: 'Failed to fetch those you follow\nTry again later'})
  }
}

export default fetchFollowing


