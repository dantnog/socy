import { Request, Response } from 'express'
import mongoose from 'mongoose'
import Post from '../../models/PostModel'

async function getPersonalPosts(req: Request, res: Response) {
  try {
    const allPosts = await Post.aggregate([{
      $match: {
        user_id: new mongoose.Types.ObjectId(req.headers.userId as string)
      }
    },{
      $lookup: {
        from: 'users',
        localField: 'user_id',
        foreignField: '_id',
        as: 'owner'
      },
    },{
      $unset: [
        'owner.email',
        'owner.password',
        'owner.createdAt',
        'owner.updatedAt'
      ]
    }])
    res.status(200).json({message: 'Fetched personal posts', data: allPosts})

    console.log(`[${new Date(Date.now()).toLocaleTimeString()}] [POST GET PERSONAL] Complete. Returning posts.`)
  } catch(err) {
    console.log(err)
    res.status(500).json({message: 'Failed to fetch personal posts\nTry again later'})
  }
}

export default getPersonalPosts

