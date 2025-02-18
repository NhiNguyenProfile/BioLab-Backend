import { checkSchema, query } from 'express-validator'
import ErrorMessages from '~/constants/errorMessage'
import { HttpStatus } from '~/constants/status'
import { ErrorWithStatus } from '~/models/errors'
import databaseService from '~/services/database.service'
import userService from '~/services/user.service'
import { hashPassword } from '~/utils/crypto'
import { decodeToken } from '~/utils/jwt'
import { validate } from '~/validators/manuallyValiadate'

// middleware that is specific to this router
const loginValidator = validate(
  checkSchema(
    {
      email: {
        errorMessage: ErrorMessages.email.invalid,
        notEmpty: {
          errorMessage: ErrorMessages.email.required
        },
        isEmail: true,
        custom: {
          options: async (value, { req }) => {
            const user = await databaseService.users.findOne({
              email: value,
              password: hashPassword(req.body.password)
            })
            if (user == null) {
              throw new ErrorWithStatus({
                status: HttpStatus.UNAUTHORIZED,
                message: ErrorMessages.auth.incorrectCredentials
              })
            }
            req.user = user
            return true
          }
        }
      }
    },
    ['body']
  )
)

const registerValidator = validate(
  checkSchema(
    {
      email: {
        errorMessage: ErrorMessages.email.invalid,
        isEmail: true,
        notEmpty: {
          errorMessage: ErrorMessages.email.required
        },
        trim: true,
        custom: {
          options: async (value) => {
            const isExistEmail = await userService.checkEmailExist(value)
            if (isExistEmail) {
              throw new Error(ErrorMessages.email.exists)
            }
            return true
          }
        }
      },
      password: {
        notEmpty: {
          errorMessage: ErrorMessages.password.required
        },
        isLength: {
          options: { min: 8, max: 100 },
          errorMessage: ErrorMessages.password.minLength
        }
      },
      confirm_password: {
        notEmpty: {
          errorMessage: ErrorMessages.confirmPassword.required
        },
        isLength: {
          options: { min: 8, max: 100 },
          errorMessage: ErrorMessages.confirmPassword.minLength
        }
      }
    },
    ['body']
  )
)

const accessTokenValidator = validate(
  checkSchema(
    {
      Authorization: {
        notEmpty: {
          errorMessage: ErrorMessages.accessToken.invalid
        },
        custom: {
          options: async (value: string, { req }) => {
            const access_token = value.replace('Bearer ', '')
            if (access_token.trim() == '') {
              throw new Error(ErrorMessages.accessToken.invalid)
            }
            const decoded_authorization = await decodeToken(access_token)
            req.decoded_authorization = decoded_authorization
            return true
          }
        }
      }
    },
    ['headers']
  )
)

const refreshTokenValidator = validate(
  checkSchema(
    {
      refresh_token: {
        notEmpty: {
          errorMessage: ErrorMessages.refreshToken.required
        },
        custom: {
          options: async (value: string, { req }) => {
            if (value.trim() == '') {
              throw new Error(ErrorMessages.accessToken.invalid)
            }
            const isExistRefreshToken = await databaseService.refreshTokens.findOne({ token: value })
            if (isExistRefreshToken) {
              throw new ErrorWithStatus({
                status: HttpStatus.UNAUTHORIZED,
                message: ErrorMessages.auth.unauthorized
              })
            }
            const decoded_authorization = await decodeToken(value)

            req.decoded_authorization = decoded_authorization
            return true
          }
        }
      }
    },
    ['body']
  )
)

export { loginValidator, registerValidator, accessTokenValidator, refreshTokenValidator }
