import { NextFunction, Request, Response } from 'express'
import { omit } from 'lodash'
import { HttpStatus } from '~/constants/status'
import { ErrorWithStatus } from '~/models/errors'

export const defaultErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ErrorWithStatus) {
    res.status(error.status).json(omit(error, ['status']))
    return
  }
  Object.getOwnPropertyNames(error).forEach((key) => {
    Object.defineProperty(error, key, { enumerable: true })
  })
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    message: error.message,
    error: omit(error, ['stack'])
  })
}
