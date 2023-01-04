import { Request, Response } from 'express'
import mongoose from 'mongoose'
import Post from '../../models/PostModel'
import User from '../../models/UserModel'


async function fetchProfile(req: Request, res: Response) {
  const {id} = req.params
  if (!id) return res.status(422).json({message: 'Missing data'})

  try {
    const profile = await User.findById(id)
      .select('-password -followlist_id -likeslist_id -createdAt -updatedAt')
    const posts = await Post.find({
      user_id: new mongoose.Types.ObjectId(id)
    })

    res.status(200).json({message: 'Fetch profile complete', data: {profile, posts}})

    console.log(`[${new Date(Date.now()).toLocaleTimeString()}] [USER FETCH PROFILE] Complete. Returning User and Posts.`)
  } catch(err) {
    console.log(err)
    res.status(500).json({message: 'Failed to fetch profile data\nTry again later'})
  }
}

export default fetchProfile


