import { NextFunction, Request, Response } from 'express'

// middleware that is specific to this router
const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  console.log('Time: ', Date.now())
  next()
}

export { loginValidator }
