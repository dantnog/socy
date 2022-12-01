import { Request, Response, NextFunction } from "express";
import decryptToken from "../helpers/decryptToken";
import User from "../models/UserModel";


async function auth(req: Request, res: Response, next: NextFunction) {
  if (!req.cookies.jwt) return res.status(401).json({message: 'Auth Failed.'})
  const token = decryptToken(req.cookies.jwt)

  const user = await User.findById(token.id)
  if (!user) return res.status(404).json({message: 'User not found.'})

  req.headers.userId = String(user._id)

  next()
}

export default auth