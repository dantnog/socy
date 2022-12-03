import { Request, Response } from 'express'
import fs from 'fs'
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
    const oldUser = await User.findById(id)
    const user = await User.findByIdAndUpdate(id, toUpdate, {new: true})
    deleteOldPicture(oldUser?.picture)
    user ? user.password = '' : null
    res.status(200).json({message: 'Update complete', data: user})
  } catch(err) {
    console.log(err)
    res.status(500).json({message: 'Failed to update\nTry again later'})
  }
}

export default updateUser
