import { Request, Response } from 'express'
import mongoose from 'mongoose'
import Likes from '../../models/LikesModel'
import Post from '../../models/PostModel'
import User from '../../models/UserModel'


async function setLikes(req: Request, res: Response) {
  const {idToLike} = req.body
  if (!idToLike) return res.status(422).json({message: 'Missing data'})

  let alreadyLiked

  try {
    const user = await User.findById(req.headers.userId)
    if (user && !user.likeslist_id) {
      // first like
      const newLike = await Likes.create({
        user_id: user._id, list: [idToLike]
      })
      await User.findByIdAndUpdate(
        req.headers.userId
      ,{
        likeslist_id: newLike._id
      })
    } else {
      const list = await Likes.findById(user?.likeslist_id)
      alreadyLiked = list?.list.find(item => String(item) === idToLike)
      if (alreadyLiked) {
        // remove like
        await list?.update({$pull: {list: idToLike}})
      } else {
        // new like
        await list?.update({$push: {list: idToLike}})
      }
    }


    const post = await Post.findById(idToLike)
    if (alreadyLiked) {
      // remove like
      await post?.update({
        $pull: {
          likes:  new mongoose.Types.ObjectId(req.headers.userId as string)
        },
        $set: {
          likesCount: post.likesCount - 1
        }
      })
    } else {
      // new like
      await post?.update({
        $push: {
          likes: new mongoose.Types.ObjectId(req.headers.userId as string)
        },
        $set: {
          likesCount: post.likesCount + 1
        }
      })
    }


    const updatedUser = await User.aggregate([{
      $match: {_id: new mongoose.Types.ObjectId(req.headers.userId as string) }
    },{
      $lookup: {
        from: 'followings',
        localField: 'followlist_id',
        foreignField: '_id',
        as: 'followinglist'
      }
    },{
      $lookup: {
        from: 'likes',
        localField: 'likeslist_id',
        foreignField: '_id',
        as: 'likeslist'
      }
    },{
      $unset: [
        'password'
      ]
    }])

    res.status(200).json({message: 'Successfully like/dislike', data: updatedUser})

    console.log(`[${new Date(Date.now()).toLocaleTimeString()}] [LIKE SET] Complete. Returning updated user.`)
  } catch(err) {
    console.log(err)
    res.status(500).json({message: 'Failed to like/dislike\nTry again later'})
  }
}

export default setLikes


