import { Router } from 'express'
import categoryController from '~/controller/category.controller'
import { createCategoryValidator, updateCategoryValidator } from '~/middlewares/category.middleware'
import { wrapAsync } from '~/utils/handler'

const categoryRouter = Router()

/**
 * Description. Create a new category
 * Path: /categorys
 * Method: POST
 * Body: { customer_id: string, category_items: Array<{ category_id: string, quantity: number }>, total_price: number }
 */
categoryRouter.post('/', createCategoryValidator, wrapAsync(categoryController.createCategory))

/**
 * Description. Get category by ID
 * Path: /categorys/:id
 * Method: GET
 * Params: { id: string }
 */
categoryRouter.get('/:id', wrapAsync(categoryController.getCategoryById))

/**
 * Description. Get all categorys (with pagination)
 * Path: /categorys
 * Method: GET
 * Query: { page?: number, limit?: number }
 */
categoryRouter.get('/', wrapAsync(categoryController.getAllCategories))

/**
 * Description. Update category by ID
 * Path: /categorys/:id
 * Method: PUT
 * Params: { id: string }
 * Body: { category_items?: Array<{ category_id: string, quantity: number }>, total_price?: number }
 */
categoryRouter.put('/:id', updateCategoryValidator, wrapAsync(categoryController.updateCategory))

/**
 * Description. Delete category by ID
 * Path: /categorys/:id
 * Method: DELETE
 * Params: { id: string }
 */
categoryRouter.delete('/:id', wrapAsync(categoryController.deleteCategory))

export default categoryRouter
