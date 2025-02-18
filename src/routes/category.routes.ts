import { Router } from 'express'
import categoryController from '~/controller/category.controller'
import { createCategoryValidator, updateCategoryValidator } from '~/middlewares/category.middleware'
import { wrapAsync } from '~/utils/handler'

const categoryRouter = Router()

/**
 * @swagger
 * /categories:
 *   post:
 *     description: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_name:
 *                 type: string
 *                 description: The name of the category
 *                 example: "Electronics"
 *     responses:
 *       200:
 *         description: Successfully created a new category
 *       400:
 *         description: Bad request
 */
categoryRouter.post('/', createCategoryValidator, wrapAsync(categoryController.createCategory))

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     description: Get category by ID
 *     tags: [Category]
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
categoryRouter.get('/:id', wrapAsync(categoryController.getCategoryById))

/**
 * @swagger
 * /categories:
 *   get:
 *     description: Get all categories (with pagination)
 *     tags: [Category]
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: Number of items per page
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Successfully fetched the categories
 *       400:
 *         description: Invalid query parameters
 */
categoryRouter.get('/', wrapAsync(categoryController.getAllCategories))

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     description: Update category by ID
 *     tags: [Category]
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
 *               category_name:
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
categoryRouter.put('/:id', updateCategoryValidator, wrapAsync(categoryController.updateCategory))

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     description: Delete category by ID
 *     tags: [Category]
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
categoryRouter.delete('/:id', wrapAsync(categoryController.deleteCategory))

export default categoryRouter
