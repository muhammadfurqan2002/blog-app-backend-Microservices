import express from 'express'
import { isAuth } from '../middlewares/isAuth.js'
import uploadFile from '../middlewares/multer.js'
import { createBlog, updateBlog } from '../cotrollers/blog.js'

const router=express.Router()

router.post('/blog/new',isAuth,uploadFile,createBlog)
router.post('/blog/:id',isAuth,uploadFile,updateBlog)
router.delete('/blog/:id',isAuth,updateBlog)


export default router