import { checkSchema } from 'express-validator'
import ErrorMessages from '~/constants/errorMessage'
import { HttpStatus } from '~/constants/status'
import { ErrorWithStatus } from '~/models/errors'
import databaseService from '~/services/database.service'
import { validate } from '~/validators/manuallyValiadate'

const createBrandValidator = validate(
  checkSchema(
    {
      brand_name: {
        notEmpty: {
          errorMessage: ErrorMessages.brand.nameRequired
        },
        isString: {
          errorMessage: ErrorMessages.brand.nameInvalid
        },
        trim: true
      },
      image_url: {
        notEmpty: {
          errorMessage: ErrorMessages.brand.imageRequired
        },
        isURL: {
          errorMessage: ErrorMessages.brand.imageInvalid
        }
      }
    },
    ['body']
  )
)

const updateBrandValidator = validate(
  checkSchema(
    {
      brand_name: {
        optional: true,
        isString: {
          errorMessage: ErrorMessages.brand.nameInvalid
        },
        trim: true
      },
      image_url: {
        optional: true,
        isURL: {
          errorMessage: ErrorMessages.brand.imageInvalid
        }
      }
    },
    ['body']
  )
)

export { createBrandValidator, updateBrandValidator }
