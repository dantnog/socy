import { Request, Response } from 'express'
import deleteOldPicture from '../../helpers/deleteOldPicture'
import User from '../../models/UserModel'

async function deleteUser(req: Request, res: Response) {
  const id = req.headers.userId

  try {
    const oldUser = await User.findById(id)
    await User.findByIdAndDelete(id)
    deleteOldPicture(oldUser?.picture)
    res.clearCookie('jwt')
    res.status(200).json({message: 'Account deleted'})
  } catch(err) {
    console.log(err)
    res.status(500).json({message: 'Failed to delete user\nTry again later'})
  }
}

export default deleteUser
