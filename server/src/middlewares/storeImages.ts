import multer from 'multer'
import path from 'path'

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = ''

    if (req.baseUrl.includes('users')) folder = 'users'
    if (req.baseUrl.includes('posts')) folder = 'posts'

    cb(null, `public/${folder}`)
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now()+
      Math.floor(Math.random()*10000)+
      path.extname(file.originalname)
    )
  }
})

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return cb(new Error("Only png, jpg and jpeg images."))
    }
    cb(null, true)
  }
})

export default imageUpload