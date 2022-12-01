import { Request, Response } from 'express'
import User from '../../models/UserModel'

async function deleteUser(req: Request, res: Response) {
  const id = req.headers.userId

  try {
    await User.findByIdAndDelete(id)
    res.clearCookie('jwt')
    res.status(200).json({message: 'Account deleted'})
  } catch(err) {
    console.log(err)
    res.status(500).json({message: 'Failed to delete user\nTry again later'})
  }
}

export default deleteUser