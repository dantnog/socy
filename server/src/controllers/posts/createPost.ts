import { Request, Response } from 'express'
import Post from '../../models/PostModel'

async function createPost(req: Request, res: Response) {
  const {message} = req.body 
  if (!message) return res.status(422).json({message: 'Missing data'})

  let toCreate: any = {
    message,
    user_id: req.headers.userId
  }

  try {
    const post = await Post.create(toCreate)
    res.status(201).json({message: 'Post created', data: post})
  } catch(err) {
    console.log(err)
    res.status(500).json({message: 'Failed to create post\nTry again later'})
  }
}

export default createPost
