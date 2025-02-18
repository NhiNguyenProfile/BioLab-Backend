import { NextFunction, Request, RequestHandler, Response } from 'express'
import { checkSchema, query } from 'express-validator'
import { ErrorWithStatus } from '~/models/errors'
import databaseService from '~/services/database.service'
import userService from '~/services/user.service'
import { hashPassword } from '~/utils/crypto'
import { getToken } from '~/utils/detectToken'
import { decodeToken } from '~/utils/jwt'
import { validate } from '~/validators/manuallyValiadate'

// middleware that is specific to this router
const loginValidator = validate(
  checkSchema({
    email: {
      errorMessage: 'Invalid email',
      isEmail: true,
      custom: {
        options: async (value, { req }) => {
          const user = await databaseService.users.findOne({ email: value, password: hashPassword(req.body.password) })
          if (user == null) {
            throw new Error('Email or Password are incorrect!')
          }
          req.user = user
          return true
        }
      }
    }
  })
)

const logoutValidator = validate(
  checkSchema({
    refresh_token: {
      trim: true,
      custom: {
        options: async (value, { req }) => {
          const accessToken = getToken(req.headers?.authorization)
          const isExistRefreshToken = await databaseService.refreshTokens.findOne({ token: value })
          if (!accessToken || !isExistRefreshToken) {
            throw new Error('Unauthorized')
          }
          return true
        }
      }
    }
  })
)

const registerValidator = validate(
  checkSchema({
    email: {
      errorMessage: 'Invalid email',
      isEmail: true,
      trim: true,
      custom: {
        options: async (value) => {
          const isExistEmail = await userService.checkEmailExist(value)
          if (isExistEmail) {
            throw new Error('Email already exists!')
          }
          return true
        }
      }
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

export { loginValidator, registerValidator, logoutValidator }
