import { USERS_MESSAGES } from '~/constants/messages'
import { HttpMessage, HttpStatus } from '~/constants/status'

type ErrorsType = Record<
  string,
  {
    msg: string
    [key: string]: any
  }
>
export class ErrorWithStatus {
  message: string
  status: number

  constructor({ message, status }: { message: string; status: number }) {
    this.message = message
    this.status = status
  }
}

export class EntityError extends ErrorWithStatus {
  errors: ErrorsType
  constructor({ message, errors }: { message?: string; errors: ErrorsType }) {
    super({ message: USERS_MESSAGES.VALIDATION_ERROR, status: HttpStatus.BAD_REQUEST })
    this.errors = errors
  }
}
