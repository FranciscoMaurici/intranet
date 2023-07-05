import multer from 'multer'
import { createRouter } from 'next-connect'

export const config = {
  api: {
    bodyParser: false,
  },
}

const router = createRouter()

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${process.cwd()}/public/img`)
    },
    filename: function (req, file, cb) {
      cb(null, new Date().getTime() + '-' + file.originalname)
    },
  }),
})

router.use(upload.single('image')).post((req, res) => {
  res.status(201).json({ filename: req.file.filename, path: req.file.path })
})

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack)
    res.status(500).end('Something broke!')
  },
  onNoMatch: (req, res) => {
    res.status(404).end('page not found')
  },
})
