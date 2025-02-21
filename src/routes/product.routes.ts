import { Router } from 'express'
import productController from '~/controller/product.controller'
import { createProductValidator, updateProductValidator } from '~/middlewares/product.middleware'
import { wrapAsync } from '~/utils/handler'

const productRouter = Router()

/**
 * @swagger
 * /products:
 *   post:
 *     description: Create a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: array
 *                 items:
 *                   type: string
 *               image_url:
 *                 type: array
 *                 items:
 *                   type: string
 *               brand:
 *                 type: string
 *               unit:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               details:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *     responses:
 *       200:
 *         description: Successfully created product
 *       400:
 *         description: Bad request
 */
productRouter.post('/', createProductValidator, wrapAsync(productController.createProduct))

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     description: Get product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to get
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved product
 *       404:
 *         description: Product not found
 */
productRouter.get('/:id', wrapAsync(productController.getProductById))

/**
 * @swagger
 * /products:
 *   get:
 *     description: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Successfully retrieved all products
 */
productRouter.get('/', wrapAsync(productController.getAllProducts))

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     description: Update product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: array
 *                 items:
 *                   type: string
 *               image_url:
 *                 type: array
 *                 items:
 *                   type: string
 *               brand:
 *                 type: string
 *               unit:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               details:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *     responses:
 *       200:
 *         description: Successfully updated product
 *       400:
 *         description: Bad request
 */
productRouter.put('/:id', updateProductValidator, wrapAsync(productController.updateProduct))

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     description: Delete product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted product
 *       404:
 *         description: Product not found
 */
productRouter.delete('/:id', wrapAsync(productController.deleteProduct))

export default productRouter
