import { Request, Response } from 'express'
import mongoose from 'mongoose'
import Post from '../../models/PostModel'

async function deletePost(req: Request, res: Response) {
  const {idToDelete} = req.params

  try {
    await Post.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(idToDelete),
      user_id: new mongoose.Types.ObjectId(req.headers.userId as string)
    })
    res.status(200).json({message: 'Post deleted'})

    console.log(`[${new Date(Date.now()).toLocaleTimeString()}] [POST DELETE] Complete.`)
  } catch(err) {
    console.log(err)
    res.status(500).json({message: 'Failed to delete post\nTry again later'})
  }
}

export default deletePost
