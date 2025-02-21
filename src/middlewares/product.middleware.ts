import { checkSchema } from 'express-validator'
import ErrorMessages from '~/constants/errorMessage'
import { HttpStatus } from '~/constants/status'
import { ErrorWithStatus } from '~/models/errors'
import databaseService from '~/services/database.service'
import { validate } from '~/validators/manuallyValiadate'
import { CategoryType } from '~/types/category.type'
import { QAType } from '~/types/product.type'
import { ObjectId } from 'mongodb'
import { BrandType } from '~/types/brand.type'

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
        custom: {
          options: async (brand: BrandType) => {
            const _brand = await databaseService.brands.findOne({ _id: new ObjectId(brand._id) })
            console.log(_brand)
            if (!_brand) {
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
        custom: {
          options: async (cat: CategoryType) => {
            const _cat = await databaseService.categories.findOne({ _id: new ObjectId(cat._id) })
            if (!_cat) {
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
        custom: {
          options: async (brand: BrandType) => {
            const _brand = await databaseService.brands.findOne({ _id: new ObjectId(brand._id) })
            if (!_brand) {
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
        custom: {
          options: async (cat: CategoryType) => {
            const _cat = await databaseService.categories.findOne({ _id: new ObjectId(cat._id) })
            if (!_cat) {
              throw new ErrorWithStatus({
                status: HttpStatus.NOT_FOUND,
                message: ErrorMessages.product.categoryNotFound
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
