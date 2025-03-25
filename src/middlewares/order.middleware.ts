import { checkSchema } from 'express-validator'
import ErrorMessages from '~/constants/errorMessage'
import { HttpStatus } from '~/constants/status'
import { ErrorWithStatus } from '~/models/errors'
import { OrderStatus, PaymentStatus } from '~/types/order.type'
import { validate } from '~/validators/manuallyValiadate'

const createOrderValidator = validate(
  checkSchema(
    {
      customer_name: {
        notEmpty: {
          errorMessage: ErrorMessages.order.customerNameRequired
        },
        isString: {
          errorMessage: ErrorMessages.order.customerNameInvalid
        }
      },
      email: {
        notEmpty: {
          errorMessage: ErrorMessages.order.emailRequired
        },
        isEmail: {
          errorMessage: ErrorMessages.order.emailInvalid
        }
      },
      phone: {
        notEmpty: {
          errorMessage: ErrorMessages.order.phoneRequired
        },
        isMobilePhone: {
          options: ['vi-VN'],
          errorMessage: ErrorMessages.order.phoneInvalid
        }
      },
      order_date: {
        optional: true,
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
      },
      status: {
        notEmpty: {
          errorMessage: ErrorMessages.order.statusRequired
        },
        isIn: {
          options: [Object.values(OrderStatus)],
          errorMessage: ErrorMessages.order.statusInvalid
        }
      },
      payment_status: {
        notEmpty: {
          errorMessage: ErrorMessages.order.paymentStatusRequired
        },
        isIn: {
          options: [Object.values(PaymentStatus)],
          errorMessage: ErrorMessages.order.paymentStatusInvalid
        }
      },
      payment_method: {
        notEmpty: {
          errorMessage: ErrorMessages.order.paymentMethodRequired
        },
        isString: {
          errorMessage: ErrorMessages.order.paymentMethodInvalid
        }
      },
      address: {
        notEmpty: {
          errorMessage: ErrorMessages.order.addressRequired
        },
        isString: {
          errorMessage: ErrorMessages.order.addressInvalid
        }
      }
    },
    ['body']
  )
)

const updateOrderValidator = validate(
  checkSchema(
    {
      status: {
        notEmpty: {
          errorMessage: ErrorMessages.order.statusRequired
        },
        isIn: {
          options: [Object.values(OrderStatus)],
          errorMessage: ErrorMessages.order.statusInvalid
        }
      },
      payment_status: {
        notEmpty: {
          errorMessage: ErrorMessages.order.paymentStatusRequired
        },
        isIn: {
          options: [Object.values(PaymentStatus)],
          errorMessage: ErrorMessages.order.paymentStatusInvalid
        }
      }
    },
    ['body']
  )
)

const validateUpdateOrderStatus = validate(
  checkSchema(
    {
      status: {
        optional: true,
        notEmpty: {
          errorMessage: ErrorMessages.order.statusRequired
        },
        isIn: {
          options: [Object.values(OrderStatus)],
          errorMessage: ErrorMessages.order.statusInvalid
        }
      },
      payment_status: {
        optional: true,
        notEmpty: {
          errorMessage: ErrorMessages.order.paymentStatusRequired
        },
        isIn: {
          options: [Object.values(PaymentStatus)],
          errorMessage: ErrorMessages.order.paymentStatusInvalid
        }
      }
    },
    ['body']
  )
)

export { createOrderValidator, updateOrderValidator, validateUpdateOrderStatus }
