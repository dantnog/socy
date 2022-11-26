import { Request, Response } from 'express'

async function logoutUser(req: Request, res: Response) {
  res.clearCookie('jwt')
  res.status(200).json({message: 'Logged out'})
}

export default logoutUser