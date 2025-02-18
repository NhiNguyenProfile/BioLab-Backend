import express from 'express'
import postController from '~/controller/post.controller'
import { validatePost, validateUpdatePost } from '~/middlewares/post.middleware'

const postRouter = express.Router()

postRouter.post('/', validatePost, postController.createPost.bind(postController))

postRouter.get('/:id', postController.getPostById.bind(postController))

postRouter.put('/:id', validateUpdatePost, postController.updatePost.bind(postController))

postRouter.delete('/:id', postController.deletePost.bind(postController))

postRouter.get('/', postController.getAllPosts.bind(postController))

export default postRouter
