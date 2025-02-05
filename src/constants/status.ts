export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}

export const HttpMessage: Record<HttpStatus, string> = {
  [HttpStatus.OK]: 'Successfully',
  [HttpStatus.CREATED]: 'Resource created successfully',
  [HttpStatus.BAD_REQUEST]: 'Invalid request',
  [HttpStatus.UNAUTHORIZED]: 'Unauthorized access',
  [HttpStatus.FORBIDDEN]: 'Forbidden',
  [HttpStatus.NOT_FOUND]: 'Resource not found',
  [HttpStatus.INTERNAL_SERVER_ERROR]: 'Internal server error'
}
