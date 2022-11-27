import { Request, Response } from 'express'
import encryptPassword from '../../helpers/encryptPassword'
import generateToken from '../../helpers/generateToken'
import User from '../../models/UserModel'

async function signupUser(req: Request, res: Response) {
  const {name, email, password} = req.body 
  if (!name || !email || !password) return res.status(422).json({message: 'Missing data'})

  const hash = encryptPassword(password)

  try {
    const user = await User.create({name, email, password: hash})
    user.password = ''
    const token = generateToken(String(user._id))
    res.cookie('jwt', token)
    res.status(201).json({message: 'Sign up complete', data: user})
  } catch(err) {
    console.log(err)
    res.status(500).json({message: 'Failed to signup\nTry again later'})
  }
}

export default signupUser