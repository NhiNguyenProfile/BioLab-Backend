import { Router } from 'express'
import sopController from '~/controller/sop.controller'
import sopMiddleware from '~/middlewares/sop.middleware'
import { wrapAsync } from '~/utils/handler'

const sopRouter = Router()

/**
 * @swagger
 * /api/sops:
 *   post:
 *     summary: Create a new SOP
 *     tags: [SOPs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - image_url
 *               - combo
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               image_url:
 *                 type: string
 *               combo:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: SOP created successfully
 *       400:
 *         description: Invalid request
 */
sopRouter.post('/', sopMiddleware.validateCreateSOP, wrapAsync(sopController.createSOP))

/**
 * @swagger
 * /api/sops:
 *   get:
 *     summary: Get all SOPs
 *     tags: [SOPs]
 *     responses:
 *       200:
 *         description: List of all SOPs
 */
sopRouter.get('/', wrapAsync(sopController.getAllSOPs))

/**
 * @swagger
 * /api/sops/{id}:
 *   get:
 *     summary: Get SOP by ID
 *     tags: [SOPs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: SOP ID
 *     responses:
 *       200:
 *         description: SOP data
 *       404:
 *         description: SOP not found
 */
sopRouter.get('/:id', sopMiddleware.validateSOPId, wrapAsync(sopController.getSOPById))

/**
 * @swagger
 * /api/sops/{id}:
 *   put:
 *     summary: Update SOP
 *     tags: [SOPs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: SOP ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               image_url:
 *                 type: string
 *     responses:
 *       200:
 *         description: SOP updated successfully
 *       404:
 *         description: SOP not found
 */
sopRouter.put('/:id', sopMiddleware.validateSOPId, wrapAsync(sopController.updateSOP))

/**
 * @swagger
 * /api/sops/{id}:
 *   delete:
 *     summary: Delete SOP
 *     tags: [SOPs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: SOP ID
 *     responses:
 *       200:
 *         description: SOP deleted successfully
 *       404:
 *         description: SOP not found
 */
sopRouter.delete('/:id', sopMiddleware.validateSOPId, wrapAsync(sopController.deleteSOP))

/**
 * @swagger
 * /api/sops/{id}/add-product:
 *   post:
 *     summary: Add product to SOP combo
 *     tags: [SOPs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: SOP ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *             properties:
 *               product_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product added to SOP successfully
 *       404:
 *         description: SOP not found
 */
sopRouter.post(
  '/:id/add-product',
  sopMiddleware.validateSOPId,
  sopMiddleware.validateAddProductToSOP,
  wrapAsync(sopController.addProductToSOP)
)

/**
 * @swagger
 * /api/sops/{id}/remove-product:
 *   post:
 *     summary: Remove product from SOP combo
 *     tags: [SOPs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: SOP ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product_id
 *             properties:
 *               product_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product removed from SOP successfully
 *       404:
 *         description: SOP not found
 */
sopRouter.post(
  '/:id/remove-product',
  sopMiddleware.validateSOPId,
  sopMiddleware.validateRemoveProductFromSOP,
  wrapAsync(sopController.removeProductFromSOP)
)

export default sopRouter
