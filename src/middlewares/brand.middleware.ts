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
      brandId: {
        notEmpty: {
          errorMessage: ErrorMessages.brand.idRequired
        },
        custom: {
          options: async (value) => {
            const brand = await databaseService.brands.findOne({ _id: value })
            if (!brand) {
              throw new ErrorWithStatus({
                status: HttpStatus.NOT_FOUND,
                message: ErrorMessages.brand.notFound
              })
            }
            return true
          }
        }
      },
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
