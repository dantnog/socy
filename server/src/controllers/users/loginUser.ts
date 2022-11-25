import { Request, Response } from 'express'
import comparePassword from '../../helpers/comparePassword'
import User from '../../models/UserModel'

async function loginUser(req: Request, res: Response) {
  const {email, password} = req.body 
  if (!email && !password) return res.status(422).json({message: 'Missing data'})

  try {
    const user = await User.findOne({email})
    if (!user) return res.status(404).json({message: 'User not found'})

    const passwordMatchs = comparePassword(password, user.password)
    if (!passwordMatchs) return res.status(403).json({message: 'Access denied'})

    res.status(200).json(user)
  } catch(err) {
    console.log(err)
    res.status(500).json({message: 'Failed to login'})
  }
}

export default loginUser