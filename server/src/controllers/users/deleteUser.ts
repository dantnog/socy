import { Request, Response } from 'express'
import deleteOldPicture from '../../helpers/deleteOldPicture'
import Following from '../../models/FollowingModel'
import User from '../../models/UserModel'

async function deleteUser(req: Request, res: Response) {
  const id = req.headers.userId

  try {
    const user = await User.findById(id)
    await user?.delete()
    user?.picture ? deleteOldPicture(user.picture) : null
    user?.followlist_id ? await Following.findByIdAndDelete(user.followlist_id) : null
    res.clearCookie('jwt')
    res.status(200).json({message: 'Account deleted'})
  } catch(err) {
    console.log(err)
    res.status(500).json({message: 'Failed to delete user\nTry again later'})
  }
}

export default deleteUser
