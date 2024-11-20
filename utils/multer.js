import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + '-' + file.originalname)
  },
})

const upload = multer({ storage: storage,limits: { fileSize: 1024 * 1024 * 10 }})

export default upload