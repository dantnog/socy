import { Request, Response } from 'express'
import mongoose from 'mongoose'
import Following from '../../models/FollowingModel'
import User from '../../models/UserModel'

async function setFollowing(req: Request, res: Response) {
  const {idToFollow} = req.body
  if (!idToFollow) return res.status(400).json({message: 'Missing data'})

  try {
    const user = await User.findById(req.headers.userId)
    if (!user) return res.status(404).json({message: 'User not found'})

    if (user && !user.followlist_id) {
      // first following
      const newFollowing = await Following.create({
        user_id: new mongoose.Types.ObjectId(user._id), list: [idToFollow]
      })
      await User.findByIdAndUpdate(
        req.headers.userId
      ,{
        followlist_id: newFollowing._id
      })
    } else {
      const list = await Following.findById(user?.followlist_id)
      const alreadyFollow = list?.list.find(item => String(item) === idToFollow)
      if (alreadyFollow) {
        // unfollow
        await list?.update({$pull: {list: idToFollow}})
      } else {
        // follow new
        await list?.update({$push: {list: idToFollow}})
      }
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
      $unset: [
        'password'
      ]
    }])

    console.log(`[${new Date(Date.now()).toLocaleTimeString()}] [SET FOLLOWING] Complete. Returning updated User.`)

    res.status(200).json({message: 'Successfully following/unfollowing', data: updatedUser})
  } catch(err) {
    console.log(err)
    res.status(500).json({message: 'Failed to follow\nTry again later'})
  }
}

export default setFollowing

