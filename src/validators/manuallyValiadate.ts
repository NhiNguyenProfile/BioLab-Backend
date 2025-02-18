import { NextFunction, Request, Response } from 'express'
import { validationResult, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'
import { EntityError, ErrorWithStatus } from '~/models/errors'

export const validate = (validations: RunnableValidationChains<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await validations.run(req)
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    const errorObjects = errors.mapped()
    const entityErrors = new EntityError({ errors: {} })
    for (const key in errorObjects) {
      const { msg } = errorObjects[key]
      if (msg instanceof ErrorWithStatus) {
        return next(msg)
      }
      entityErrors.errors[key] = msg
    }

    next(entityErrors)
  }
}
