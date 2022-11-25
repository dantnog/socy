import jwt from 'jsonwebtoken'

function generateToken(id: string): string {
  const secret = 'supersecretphrase'

  return jwt.sign({id}, secret, {expiresIn: '3d'})
}

export default generateToken