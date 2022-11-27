import bcrypt from 'bcrypt'

function encryptPassword(password: string): string {
  const salt = bcrypt.genSaltSync(12)
  return bcrypt.hashSync(password, salt)
}

export default encryptPassword