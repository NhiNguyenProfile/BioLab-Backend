import { Router } from 'express'
import postCategoryController from '~/controller/postCategory.controller'
import { createPostCategoryValidator, updatePostCategoryValidator } from '~/middlewares/postCategory.middleware'
import { wrapAsync } from '~/utils/handler'

const postCategoryRouter = Router()

/**
 * @swagger
 * /post-categories:
 *   post:
 *     description: Create a new category
 *     tags: [PostCategory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               post_category_name:
 *                 type: string
 *                 description: The name of the category
 *                 example: "Electronics"
 *     responses:
 *       200:
 *         description: Successfully created a new category
 *       400:
 *         description: Bad request
 */
postCategoryRouter.post('/', createPostCategoryValidator, wrapAsync(postCategoryController.createPostCategory))

/**
 * @swagger
 * /post-categories/{id}:
 *   get:
 *     description: Get category by ID
 *     tags: [PostCategory]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched the category
 *       404:
 *         description: Category not found
 */
postCategoryRouter.get('/:id', wrapAsync(postCategoryController.getPostCategoryById))

/**
 * @swagger
 * /post-categories:
 *   get:
 *     description: Get all categories (with pagination)
 *     tags: [PostCategory]
 *     responses:
 *       200:
 *         description: Successfully fetched the categories
 *       400:
 *         description: Invalid query parameters
 */
postCategoryRouter.get('/', wrapAsync(postCategoryController.getAllCategories))

/**
 * @swagger
 * /post-categories/{id}:
 *   put:
 *     description: Update category by ID
 *     tags: [PostCategory]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the category
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               post_category_name:
 *                 type: string
 *                 description: The updated name of the category
 *                 example: "Home Appliances"
 *     responses:
 *       200:
 *         description: Successfully updated the category
 *       400:
 *         description: Bad request
 *       404:
 *         description: Category not found
 */
postCategoryRouter.put('/:id', updatePostCategoryValidator, wrapAsync(postCategoryController.updatePostCategory))

/**
 * @swagger
 * /post-categories/{id}:
 *   delete:
 *     description: Delete category by ID
 *     tags: [PostCategory]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the category
 *       404:
 *         description: Category not found
 */
postCategoryRouter.delete('/:id', wrapAsync(postCategoryController.deletePostCategory))

export default postCategoryRouter
