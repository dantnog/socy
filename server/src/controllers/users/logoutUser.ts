import { Request, Response } from 'express'

async function logoutUser(req: Request, res: Response) {
  res.clearCookie('jwt')
  res.status(200).json({message: 'Logged out'})

  console.log(`[${new Date(Date.now()).toLocaleTimeString()}] [USER LOGOUT] Complete.`)
}

export default logoutUser