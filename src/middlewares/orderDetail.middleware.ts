import { checkSchema } from 'express-validator'
import ErrorMessages from '~/constants/errorMessage'
import { HttpStatus } from '~/constants/status'
import { ErrorWithStatus } from '~/models/errors'
import databaseService from '~/services/database.service'
import { validate } from '~/validators/manuallyValiadate'

const createOrderDetailValidator = validate(
  checkSchema(
    {
      order_id: {
        notEmpty: {
          errorMessage: ErrorMessages.orderDetail.orderIdRequired
        },
        custom: {
          options: async (value) => {
            const order = await databaseService.orders.findOne({ _id: value })
            if (!order) {
              throw new ErrorWithStatus({
                status: HttpStatus.NOT_FOUND,
                message: ErrorMessages.orderDetail.orderNotFound
              })
            }
            return true
          }
        }
      },
      product_id: {
        notEmpty: {
          errorMessage: ErrorMessages.orderDetail.productIdRequired
        },
        custom: {
          options: async (value) => {
            const product = await databaseService.products.findOne({ _id: value })
            if (!product) {
              throw new ErrorWithStatus({
                status: HttpStatus.NOT_FOUND,
                message: ErrorMessages.orderDetail.productNotFound
              })
            }
            return true
          }
        }
      },
      quantity: {
        notEmpty: {
          errorMessage: ErrorMessages.orderDetail.quantityRequired
        },
        isInt: {
          options: { min: 1 },
          errorMessage: ErrorMessages.orderDetail.quantityInvalid
        }
      },
      subtotal: {
        notEmpty: {
          errorMessage: ErrorMessages.orderDetail.subtotalRequired
        },
        isFloat: {
          options: { min: 0 },
          errorMessage: ErrorMessages.orderDetail.subtotalInvalid
        }
      }
    },
    ['body']
  )
)

const updateOrderDetailValidator = validate(
  checkSchema(
    {
      quantity: {
        optional: true,
        isInt: {
          options: { min: 1 },
          errorMessage: ErrorMessages.orderDetail.quantityInvalid
        }
      },
      subtotal: {
        optional: true,
        isFloat: {
          options: { min: 0 },
          errorMessage: ErrorMessages.orderDetail.subtotalInvalid
        }
      }
    },
    ['body']
  )
)

export { createOrderDetailValidator, updateOrderDetailValidator }
