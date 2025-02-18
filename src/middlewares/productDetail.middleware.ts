import { checkSchema } from 'express-validator'
import ErrorMessages from '~/constants/errorMessage'
import { HttpStatus } from '~/constants/status'
import { ErrorWithStatus } from '~/models/errors'
import databaseService from '~/services/database.service'
import { validate } from '~/validators/manuallyValiadate'

const createProductDetailValidator = validate(
  checkSchema(
    {
      product_id: {
        notEmpty: {
          errorMessage: ErrorMessages.productDetail.productIdRequired
        },
        custom: {
          options: async (value) => {
            const product = await databaseService.products.findOne({ _id: value })
            if (!product) {
              throw new ErrorWithStatus({
                status: HttpStatus.NOT_FOUND,
                message: ErrorMessages.productDetail.productNotFound
              })
            }
            return true
          }
        }
      },
      unit: {
        notEmpty: {
          errorMessage: ErrorMessages.productDetail.unitRequired
        },
        isString: {
          errorMessage: ErrorMessages.productDetail.unitInvalid
        },
        trim: true
      },
      price: {
        notEmpty: {
          errorMessage: ErrorMessages.productDetail.priceRequired
        },
        isFloat: {
          options: { min: 0 },
          errorMessage: ErrorMessages.productDetail.priceInvalid
        }
      },
      stock: {
        notEmpty: {
          errorMessage: ErrorMessages.productDetail.stockRequired
        },
        isInt: {
          options: { min: 0 },
          errorMessage: ErrorMessages.productDetail.stockInvalid
        }
      }
    },
    ['body']
  )
)

const updateProductDetailValidator = validate(
  checkSchema(
    {
      unit: {
        optional: true,
        isString: {
          errorMessage: ErrorMessages.productDetail.unitInvalid
        },
        trim: true
      },
      price: {
        optional: true,
        isFloat: {
          options: { min: 0 },
          errorMessage: ErrorMessages.productDetail.priceInvalid
        }
      },
      stock: {
        optional: true,
        isInt: {
          options: { min: 0 },
          errorMessage: ErrorMessages.productDetail.stockInvalid
        }
      }
    },
    ['body']
  )
)

export { createProductDetailValidator, updateProductDetailValidator }
