import express from 'express'
import postController from '~/controller/post.controller'
import { createPostValidator, updatePostValidator } from '~/middlewares/post.middleware'
import { wrapAsync } from '~/utils/handler'

const postRouter = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     PostCategoryType:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID của danh mục bài viết
 *           example: "6521a9c1f1b5a3a2e4f6d7e8"
 *         post_category_name:
 *           type: string
 *           description: Tên danh mục bài viết
 *           example: "Technology"
 *     Post:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Tiêu đề của bài viết
 *           example: "Hướng dẫn lập trình Node.js"
 *         category:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PostCategoryType'
 *         status:
 *           type: string
 *           enum: ["DRAFT", "PUBLISHED", "ARCHIEVED"]
 *           description: Trạng thái của bài viết
 *           example: "PUBLISHED"
 *         post_contents:
 *           type: string
 *           description: Nội dung của bài viết
 *           example: "Nội dung chi tiết của bài viết về Node.js"
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     description: Tạo một bài viết mới
 *     tags: [Post]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: Bài viết được tạo thành công
 *       400:
 *         description: Yêu cầu không hợp lệ
 */
postRouter.post('/', createPostValidator, wrapAsync(postController.createPost))

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     description: Lấy thông tin bài viết theo ID
 *     tags: [Post]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của bài viết
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Trả về thông tin bài viết
 *       404:
 *         description: Không tìm thấy bài viết
 */
postRouter.get('/:id', wrapAsync(postController.getPostById))

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     description: Cập nhật bài viết theo ID
 *     tags: [Post]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của bài viết
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Bài viết đã được cập nhật
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       404:
 *         description: Không tìm thấy bài viết
 */
postRouter.put('/:id', updatePostValidator, wrapAsync(postController.updatePost))

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     description: Xóa bài viết theo ID
 *     tags: [Post]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của bài viết
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bài viết đã bị xóa
 *       404:
 *         description: Không tìm thấy bài viết
 */
postRouter.delete('/:id', wrapAsync(postController.deletePost))

/**
 * @swagger
 * /posts:
 *   get:
 *     description: Lấy danh sách tất cả bài viết
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: Trả về danh sách bài viết
 *       400:
 *         description: Tham số không hợp lệ
 */
postRouter.get('/', wrapAsync(postController.getAllPosts))

export default postRouter
