import { Request, Response } from 'express'
import encryptPassword from '../../helpers/encryptPassword'
import deleteOldPicture from '../../helpers/deleteOldPicture'
import User from '../../models/UserModel'

async function updateUser(req: Request, res: Response) {
  const {name, description, location, password} = req.body 

  let toUpdate: any = {}

  name ? toUpdate['name'] = name : null
  description ? toUpdate['description'] = description : null
  location ? toUpdate['location'] = location : null
  password ? toUpdate['password'] = encryptPassword(password) : null

  const image = req.file
  image ? toUpdate['picture'] = image.filename : null

  const id = req.headers.userId

  try {
    const user = await User.findById(id)
    image && user ? deleteOldPicture(user.picture) : null

    const newUser = await User.findByIdAndUpdate(id, toUpdate ,{new: true})
    newUser ? newUser.password = 'null' : null
    res.status(200).json({message: 'Update complete', data: newUser})

    console.log(`[${new Date(Date.now()).toLocaleTimeString()}] [USER SIGNUP] Complete. Returning User.`)
  } catch(err) {
    console.log(err)
    res.status(500).json({message: 'Failed to update\nTry again later'})
  }
}

export default updateUser
