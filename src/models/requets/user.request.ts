export interface RegisterReqBody {
  fullname: string
  email: string
  phone: string
  password: string
  confirm_password: string
}

export interface UpdateUserReqBody {
  fullname: string
}
