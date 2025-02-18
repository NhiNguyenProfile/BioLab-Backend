import { Router } from 'express'
import brandController from '~/controller/brand.controller'
import { createBrandValidator, updateBrandValidator } from '~/middlewares/brand.middleware'
import { wrapAsync } from '~/utils/handler'

const brandRouter = Router()

/**
 * @swagger
 * /brands:
 *   post:
 *     description: Create a new brand
 *     tags: [Brand]  # Thêm tag để nhóm các route liên quan lại với nhau
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brand_name:
 *                 type: string
 *               image_url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully created brand
 *       400:
 *         description: Bad request
 */
brandRouter.post('/', createBrandValidator, wrapAsync(brandController.createBrand))

/**
 * @swagger
 * /brands/{id}:
 *   get:
 *     description: Get brand by ID
 *     tags: [Brand]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the brand to get
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved brand
 *       404:
 *         description: Brand not found
 */
brandRouter.get('/:id', wrapAsync(brandController.getBrandById))

/**
 * @swagger
 * /brands:
 *   get:
 *     description: Get all brands
 *     tags: [Brand]
 *     responses:
 *       200:
 *         description: Successfully retrieved all brands
 */
brandRouter.get('/', wrapAsync(brandController.getAllBrands))

/**
 * @swagger
 * /brands/{id}:
 *   put:
 *     description: Update brand by ID
 *     tags: [Brand]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the brand to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brand_name:
 *                 type: string
 *               image_url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated brand
 *       400:
 *         description: Bad request
 */
brandRouter.put('/:id', updateBrandValidator, wrapAsync(brandController.updateBrand))

/**
 * @swagger
 * /brands/{id}:
 *   delete:
 *     description: Delete brand by ID
 *     tags: [Brand]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the brand to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted brand
 *       404:
 *         description: Brand not found
 */
brandRouter.delete('/:id', wrapAsync(brandController.deleteBrand))

export default brandRouter
