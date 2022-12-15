import { Request, Response } from 'express'
import comparePassword from '../../helpers/comparePassword'
import generateToken from '../../helpers/generateToken'
import User from '../../models/UserModel'

async function loginUser(req: Request, res: Response) {
  const {email, password} = req.body 
  if (!email || !password) return res.status(422).json({message: 'Missing data'})

  try {
    const user = await User.findOne({email})
    if (!user) return res.status(404).json({message: 'User not found'})

    const passwordMatchs = comparePassword(password, user.password)
    if (!passwordMatchs) return res.status(403).json({message: 'Access denied'})

    const updatedUser = await User.aggregate([{
      $match: {email: email}
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

    const token = generateToken(String(user._id))
    res.cookie('jwt', token)
    res.status(200).json({message: 'Logged in successfully', data: updatedUser})
  } catch(err) {
    console.log(err)
    res.status(500).json({message: 'Failed to login'})
  }
}

export default loginUser