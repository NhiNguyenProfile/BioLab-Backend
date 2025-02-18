import { checkSchema } from 'express-validator'
import ErrorMessages from '~/constants/errorMessage'
import { HttpStatus } from '~/constants/status'
import { ErrorWithStatus } from '~/models/errors'
import databaseService from '~/services/database.service'
import { validate } from '~/validators/manuallyValiadate'
import { CategoryType } from '~/types/category.type'
import { QAType } from '~/types/product.type'
import { ObjectId } from 'mongodb'

const createProductValidator = validate(
  checkSchema(
    {
      name: {
        notEmpty: {
          errorMessage: ErrorMessages.product.nameRequired
        },
        isString: {
          errorMessage: ErrorMessages.product.nameInvalid
        },
        trim: true
      },
      description: {
        notEmpty: {
          errorMessage: ErrorMessages.product.descriptionRequired
        },
        isString: {
          errorMessage: ErrorMessages.product.descriptionInvalid
        },
        trim: true
      },
      brand: {
        notEmpty: {
          errorMessage: ErrorMessages.product.brandRequired
        },
        isMongoId: {
          errorMessage: ErrorMessages.product.brandInvalid
        },
        custom: {
          options: async (brandId: string) => {
            const brand = await databaseService.brands.findOne({ _id: new ObjectId(brandId) })
            if (!brand) {
              throw new ErrorWithStatus({
                status: HttpStatus.NOT_FOUND,
                message: ErrorMessages.product.brandNotFound
              })
            }
            return true
          }
        }
      },
      category: {
        notEmpty: {
          errorMessage: ErrorMessages.product.categoryRequired
        },
        isArray: {
          errorMessage: ErrorMessages.product.categoryInvalid
        },
        custom: {
          options: async (categories: CategoryType[]) => {
            const categoryIds = categories.map((cat) => new ObjectId(cat._id))

            const existingCategories = await databaseService.categories.find({ _id: { $in: categoryIds } }).toArray()

            if (existingCategories.length !== categories.length) {
              throw new ErrorWithStatus({
                status: HttpStatus.NOT_FOUND,
                message: ErrorMessages.product.categoryNotFound
              })
            }
            return true
          }
        }
      },
      image_url: {
        notEmpty: {
          errorMessage: ErrorMessages.product.imageRequired
        },
        isArray: {
          errorMessage: ErrorMessages.product.imageInvalid
        },
        custom: {
          options: (value: string[]) => {
            if (!value.every((url) => typeof url === 'string')) {
              throw new Error(ErrorMessages.product.imageInvalid)
            }
            return true
          }
        }
      },
      qa: {
        optional: true,
        isArray: {
          errorMessage: ErrorMessages.product.qaInvalid
        },
        custom: {
          options: (value: QAType[]) => {
            if (value) {
              if (!value.every((qa) => qa.question && qa.answer)) {
                throw new Error(ErrorMessages.product.qaInvalid)
              }
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

const updateProductValidator = validate(
  checkSchema(
    {
      name: {
        optional: true,
        isString: {
          errorMessage: ErrorMessages.product.nameInvalid
        },
        trim: true
      },
      description: {
        optional: true,
        isString: {
          errorMessage: ErrorMessages.product.descriptionInvalid
        },
        trim: true
      },
      brand: {
        notEmpty: {
          errorMessage: ErrorMessages.product.brandRequired
        },
        isMongoId: {
          errorMessage: ErrorMessages.product.brandInvalid
        },
        custom: {
          options: async (brandId: string) => {
            const brand = await databaseService.brands.findOne({ _id: new ObjectId(brandId) })
            if (!brand) {
              throw new ErrorWithStatus({
                status: HttpStatus.NOT_FOUND,
                message: ErrorMessages.product.brandNotFound
              })
            }
            return true
          }
        }
      },
      category: {
        optional: true,
        isArray: {
          errorMessage: ErrorMessages.product.categoryInvalid
        },
        custom: {
          options: async (categories: CategoryType[]) => {
            const categoryIds = categories.map((cat) => new ObjectId(cat._id))

            const existingCategories = await databaseService.categories.find({ _id: { $in: categoryIds } }).toArray()

            if (existingCategories.length !== categories.length) {
              throw new ErrorWithStatus({
                status: HttpStatus.NOT_FOUND,
                message: ErrorMessages.product.categoryNotFound
              })
            }
            return true
          }
        }
      },
      image_url: {
        optional: true,
        isArray: {
          errorMessage: ErrorMessages.product.imageInvalid
        },
        custom: {
          options: (value: string[]) => {
            if (value) {
              if (!value.every((url) => typeof url === 'string')) {
                throw new Error(ErrorMessages.product.imageInvalid)
              }
            }
            return true
          }
        }
      },
      qa: {
        optional: true,
        isArray: {
          errorMessage: ErrorMessages.product.qaInvalid
        },
        custom: {
          options: (value: QAType[]) => {
            if (!value.every((qa) => qa.question && qa.answer)) {
              throw new Error(ErrorMessages.product.qaInvalid)
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export { createProductValidator, updateProductValidator }
