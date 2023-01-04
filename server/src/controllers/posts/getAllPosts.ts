import { Request, Response } from 'express'
import Post from '../../models/PostModel'

async function getAllPosts(req: Request, res: Response) {
  try {
    const allPosts = await Post.aggregate([{
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
    res.status(200).json({message: 'Fetched all posts', data: allPosts})

    console.log(`[${new Date(Date.now()).toLocaleTimeString()}] [POST GET ALL] Complete. Returning posts.`)
  } catch(err) {
    console.log(err)
    res.status(500).json({message: 'Failed to fetch all posts\nTry again later'})
  }
}

export default getAllPosts

