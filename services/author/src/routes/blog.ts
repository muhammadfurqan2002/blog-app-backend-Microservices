import express from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import uploadFile from '../middlewares/multer.js'
import { createBlog } from '../cotrollers/blog.js'

const router=express.Router()

router.post('/blog/new',isAuth,uploadFile,createBlog)


export default router