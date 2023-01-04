import { Request, Response } from 'express'
import User from '../../models/UserModel'

async function searchUser(req: Request, res: Response) {
  const {name} = req.body
  if (!name) return res.status(422).json({message: 'Missing data'})

  try {
    const users = await User.find({'name': {$regex: name, $options: 'i' }})
      .select('-password -createdAt -updatedAt -description -location -email')
      .limit(50)
    res.status(200).json({message: 'User search complete', data: users})
    
    console.log(`[${new Date(Date.now()).toLocaleTimeString()}] [USER SEARCH] Complete. Returning search.`)
  } catch(err) {
    console.log(err)
    res.status(500).json({message: 'Failed to search for user\nTry again later'})
  }
}

export default searchUser

