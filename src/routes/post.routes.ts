import express from 'express'
import postController from '~/controller/post.controller'

const postRouter = express.Router()

// Tạo bài viết mới
postRouter.post('/', postController.createPost)

// Lấy thông tin bài viết theo ID
postRouter.get('/:id', postController.getPostById)

// Cập nhật bài viết
postRouter.put('/:id', postController.updatePost)

// Xóa bài viết
postRouter.delete('/:id', postController.deletePost)

// Lấy tất cả bài viết
postRouter.get('/', postController.getAllPosts)

export default postRouter
