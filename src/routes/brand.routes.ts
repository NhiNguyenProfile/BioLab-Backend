import { Router } from 'express'
import brandController from '~/controller/brand.controller'
import { createBrandValidator, updateBrandValidator } from '~/middlewares/brand.middleware'
import { wrapAsync } from '~/utils/handler'

const brandRouter = Router()

/**
 * Description. Create a new brand
 * Path: /brands
 * Method: POST
 * Body: { brand_name: string, image_url: string }
 */
brandRouter.post('/', createBrandValidator, wrapAsync(brandController.createBrand))

/**
 * Description. Get brand by ID
 * Path: /brands/:id
 * Method: GET
 * Params: { id: string }
 */
brandRouter.get('/:id', wrapAsync(brandController.getBrandById))

/**
 * Description. Get all brands
 * Path: /brands
 * Method: GET
 */
brandRouter.get('/', wrapAsync(brandController.getAllBrands))

/**
 * Description. Update brand by ID
 * Path: /brands/:id
 * Method: PUT
 * Params: { id: string }
 * Body: { brand_name?: string, image_url?: string }
 */
brandRouter.put('/:id', updateBrandValidator, wrapAsync(brandController.updateBrand))

/**
 * Description. Delete brand by ID
 * Path: /brands/:id
 * Method: DELETE
 * Params: { id: string }
 */
brandRouter.delete('/:id', wrapAsync(brandController.deleteBrand))

export default brandRouter
