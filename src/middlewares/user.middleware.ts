import { NextFunction, Request, RequestHandler, Response } from 'express'
import { checkSchema, query } from 'express-validator'
import { validate } from '~/validators/manuallyValiadate'

// middleware that is specific to this router
const loginValidator = validate(
  checkSchema({
    email: {
      errorMessage: 'Invalid email',
      isEmail: true
    }
  })
)

const registerValidator = validate(
  checkSchema({
    email: {
      errorMessage: 'Invalid email',
      isEmail: true
    },
    password: {
      isLength: {
        options: { min: 8, max: 100 },
        errorMessage: 'Password should be at least 8 chars!'
      }
    },
    confirm_password: {
      isLength: {
        options: { min: 8, max: 100 },
        errorMessage: 'Confirm Password should be at least 8 chars!'
      }
    }
  })
)

export { loginValidator, registerValidator }
