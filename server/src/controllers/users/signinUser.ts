import { Request, Response } from 'express'
import encryptPassword from '../../helpers/encryptPassword'
import User from '../../models/UserModel'

async function signinUser(req: Request, res: Response) {
  const {name, email, password} = req.body 
  if (!name && !email && !password) return res.status(422).json({message: 'Missing data'})

  const hash = encryptPassword(password)

  try {
    const user = await User.create({name, email, password: hash})
    res.status(201).json(user)
  } catch(err) {
    console.log(err)
    res.status(500).json({message: 'Failed to create user'})
  }
}

export default signinUser