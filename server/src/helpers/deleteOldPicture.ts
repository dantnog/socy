import fs from 'fs'

function deleteOldPicture(picture?: string) {
  try {
    picture ? fs.unlinkSync(`public/users/${picture}`) : null
  } catch(err) {
    console.log(err)
  }
}

export default deleteOldPicture
