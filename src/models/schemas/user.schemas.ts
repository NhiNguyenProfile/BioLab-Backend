import { ObjectId } from 'mongodb'
import { UserType, UserVerifyStatus } from '~/types/user.type'

export default class User {
  private id?: ObjectId
  private fullname?: string
  private email: string
  private password: string
  private created_at?: Date
  private updated_at?: Date
  private email_verify_token?: string
  private forgot_password_token?: string
  private verify?: UserVerifyStatus

  constructor(user: UserType) {
    this.id = user.id
    this.fullname = user.fullname
    this.email = user.email
    this.password = user.password
    this.created_at = user.created_at
    this.updated_at = user.updated_at
    this.email_verify_token = user.email_verify_token
    this.forgot_password_token = user.forgot_password_token
    this.verify = user.verify
  }

  public getId(): ObjectId | undefined {
    return this.id
  }

  public getFullname(): string | undefined {
    return this.fullname
  }

  public getEmail(): string {
    return this.email
  }

  public getPassword(): string {
    return this.password
  }

  public getCreatedAt(): Date | undefined {
    return this.created_at
  }

  public getUpdatedAt(): Date | undefined {
    return this.updated_at
  }

  public getEmailVerifyToken(): string | undefined {
    return this.email_verify_token
  }

  public getForgotPasswordToken(): string | undefined {
    return this.forgot_password_token
  }

  public getVerifyStatus(): UserVerifyStatus | undefined {
    return this.verify
  }

  public setFullname(fullname: string): void {
    this.fullname = fullname
  }

  public setEmail(email: string): void {
    this.email = email
  }

  public setPassword(password: string): void {
    this.password = password
  }

  public setUpdatedAt(date: Date): void {
    this.updated_at = date
  }

  public setVerifyStatus(status: UserVerifyStatus): void {
    this.verify = status
  }
}
