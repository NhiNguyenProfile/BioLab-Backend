import { Router } from 'express'
import productController from '~/controller/product.controller'
import { createProductValidator, updateProductValidator } from '~/middlewares/product.middleware'
import { wrapAsync } from '~/utils/handler'

const productRouter = Router()

/**
 * Description. Create a new product
 * Path: /products
 * Method: POST
 * Body: { customer_id: string, product_items: Array<{ product_id: string, quantity: number }>, total_price: number }
 */
productRouter.post('/', createProductValidator, wrapAsync(productController.createProduct))

/**
 * Description. Get product by ID
 * Path: /products/:id
 * Method: GET
 * Params: { id: string }
 */
productRouter.get('/:id', wrapAsync(productController.getProductById))

/**
 * Description. Get all products (with pagination)
 * Path: /products
 * Method: GET
 * Query: { page?: number, limit?: number }
 */
productRouter.get('/', wrapAsync(productController.getAllProducts))

/**
 * Description. Update product by ID
 * Path: /products/:id
 * Method: PUT
 * Params: { id: string }
 * Body: { product_items?: Array<{ product_id: string, quantity: number }>, total_price?: number }
 */
productRouter.put('/:id', updateProductValidator, wrapAsync(productController.updateProduct))

/**
 * Description. Delete product by ID
 * Path: /products/:id
 * Method: DELETE
 * Params: { id: string }
 */
productRouter.delete('/:id', wrapAsync(productController.deleteProduct))

export default productRouter
