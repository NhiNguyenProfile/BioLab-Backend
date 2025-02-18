import { checkSchema } from 'express-validator'
import ErrorMessages from '~/constants/errorMessage'
import { HttpStatus } from '~/constants/status'
import { ErrorWithStatus } from '~/models/errors'
import databaseService from '~/services/database.service'
import { validate } from '~/validators/manuallyValiadate'

const createProductRateValidator = validate(
  checkSchema(
    {
      userId: {
        notEmpty: {
          errorMessage: ErrorMessages.productRate.userIdRequired
        },
        custom: {
          options: async (value) => {
            const user = await databaseService.users.findOne({ _id: value })
            if (!user) {
              throw new ErrorWithStatus({
                status: HttpStatus.NOT_FOUND,
                message: ErrorMessages.productRate.userNotFound
              })
            }
            return true
          }
        }
      },
      productId: {
        notEmpty: {
          errorMessage: ErrorMessages.productRate.productIdRequired
        },
        custom: {
          options: async (value) => {
            const product = await databaseService.products.findOne({ _id: value })
            if (!product) {
              throw new ErrorWithStatus({
                status: HttpStatus.NOT_FOUND,
                message: ErrorMessages.productRate.productNotFound
              })
            }
            return true
          }
        }
      },
      content: {
        optional: true,
        isString: {
          errorMessage: ErrorMessages.productRate.contentInvalid
        },
        trim: true
      },
      rate: {
        notEmpty: {
          errorMessage: ErrorMessages.productRate.rateRequired
        },
        isInt: {
          options: { min: 1, max: 5 },
          errorMessage: ErrorMessages.productRate.rateInvalid
        }
      }
    },
    ['body']
  )
)

const updateProductRateValidator = validate(
  checkSchema(
    {
      content: {
        optional: true,
        isString: {
          errorMessage: ErrorMessages.productRate.contentInvalid
        },
        trim: true
      },
      rate: {
        optional: true,
        isInt: {
          options: { min: 1, max: 5 },
          errorMessage: ErrorMessages.productRate.rateInvalid
        }
      }
    },
    ['body']
  )
)

export { createProductRateValidator, updateProductRateValidator }
