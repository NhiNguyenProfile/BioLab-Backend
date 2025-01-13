import { NextFunction, Request, Response } from 'express'

const loginController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body
    if (email === 'duthanhduoc@gmail.com' && password === '123456') {
      res.status(200).json({
        message: 'Login success'
      })
      return
    }
    res.status(400).json({
      error: 'Login failed'
    })
  } catch (error) {
    next(error)
  }
}

const registerController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email == 'duthanhduoc@gmail.com' && password == '123456') {
    return res.status(200).json({
      message: 'Login success'
    })
  }
  return res.status(400).json({
    error: 'Login failed'
  })
}

export { loginController, registerController }
