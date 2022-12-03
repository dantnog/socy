import { Request, Response } from 'express'
import mongoose from 'mongoose'
import Post from '../../models/PostModel'

async function createPost(req: Request, res: Response) {
  const {message} = req.body 
  if (!message) return res.status(422).json({message: 'Missing data'})

  const userId = req.headers.userId as string

  let toCreate: any = {
    message,
    user_id: new mongoose.Types.ObjectId(userId)
  }

  try {
    const post = await Post.create(toCreate)
    //const posts = await Post.find()
    res.status(201).json({message: 'Post created', data: post})
  } catch(err) {
    console.log(err)
    res.status(500).json({message: 'Failed to create post\nTry again later'})
  }
}

export default createPost
