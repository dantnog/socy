import bcrypt from 'bcrypt'

function comparePassword(password: string, hash: string): Boolean {
  return bcrypt.compareSync(password, hash)
}

export default comparePassword