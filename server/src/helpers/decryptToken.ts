import jwt from 'jsonwebtoken'

function decryptToken(token: string) {
  const secret = 'supersecretphrase'

  const decoded = jwt.verify(token, secret) as string
  return Object(decoded)
}

export default decryptToken