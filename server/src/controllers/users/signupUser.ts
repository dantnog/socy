import { Request, Response } from 'express'
import encryptPassword from '../../helpers/encryptPassword'
import generateToken from '../../helpers/generateToken'
import User from '../../models/UserModel'

async function signupUser(req: Request, res: Response) {
  const {name, email, password} = req.body 
  if (!name || !email || !password) return res.status(422).json({message: 'Missing data'})

  let toCreate: any = {}

  const hash = encryptPassword(password)
  toCreate = {name, email, password: hash}

  const image = req.file
  if (image) toCreate['picture'] = image.filename

  const userExists = await User.findOne({email: email})
  if (userExists) return res.status(400).json({message: 'User already exists'})

  try {
    const user = await User.create(toCreate)
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
