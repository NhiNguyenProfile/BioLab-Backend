import { NextFunction, Request, Response } from 'express'
import { body, validationResult, ContextRunner, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema'
import { HttpMessage, HttpStatus } from '~/constants/status'

export const validate = (validations: RunnableValidationChains<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await validations.run(req)
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    res.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      msg: HttpMessage[HttpStatus.BAD_REQUEST],
      data: req.body,
      errors: errors.mapped()
    })
  }
}
