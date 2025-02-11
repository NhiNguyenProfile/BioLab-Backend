export interface RegisterReqBody {
  fullname: string
  email: string
  password: string
  confirm_password: string
}

export interface UpdateUserReqBody {
  fullname: string
}
