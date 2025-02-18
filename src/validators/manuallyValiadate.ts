import { NextFunction, Request, Response } from 'express'
import { ValidationChain, validationResult } from 'express-validator'
import { EntityError, ErrorWithStatus } from '~/models/errors'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'

export const validate = (validations: RunnableValidationChains<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await validations.run(req)
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const errorObjects = errors.mapped()
      const entityErrors = new EntityError({ errors: {} })
      for (const key in errorObjects) {
        const { msg } = errorObjects[key]
        entityErrors.errors[key] = msg
      }
      return next(entityErrors)
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
