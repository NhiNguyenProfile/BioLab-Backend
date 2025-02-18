import { checkSchema } from 'express-validator'
import ErrorMessages from '~/constants/errorMessage'
import { HttpStatus } from '~/constants/status'
import { ErrorWithStatus } from '~/models/errors'
import databaseService from '~/services/database.service'
import { validate } from '~/validators/manuallyValiadate'

const createOrderValidator = validate(
  checkSchema(
    {
      customer_id: {
        notEmpty: {
          errorMessage: ErrorMessages.order.customerIdRequired
        },
        custom: {
          options: async (value) => {
            const customer = await databaseService.users.findOne({ _id: value })
            if (!customer) {
              throw new ErrorWithStatus({
                status: HttpStatus.NOT_FOUND,
                message: ErrorMessages.order.customerNotFound
              })
            }
            return true
          }
        }
      },
      order_date: {
        notEmpty: {
          errorMessage: ErrorMessages.order.orderDateRequired
        },
        isISO8601: {
          errorMessage: ErrorMessages.order.orderDateInvalid
        }
      },
      total_amount: {
        notEmpty: {
          errorMessage: ErrorMessages.order.totalAmountRequired
        },
        isFloat: {
          options: { min: 0 },
          errorMessage: ErrorMessages.order.totalAmountInvalid
        }
      }
    },
    ['body']
  )
)

const updateOrderValidator = validate(
  checkSchema(
    {
      order_date: {
        optional: true,
        isISO8601: {
          errorMessage: ErrorMessages.order.orderDateInvalid
        }
      },
      total_amount: {
        optional: true,
        isFloat: {
          options: { min: 0 },
          errorMessage: ErrorMessages.order.totalAmountInvalid
        }
      }
    },
    ['body']
  )
)

export { createOrderValidator, updateOrderValidator }
