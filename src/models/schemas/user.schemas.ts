import { ObjectId } from 'mongodb'
import { UserType, UserVerifyStatus } from '~/types/user.type'

export default class User {
  private _id: ObjectId
  private name: string
  private email: string
  private password: string
  private created_at: Date
  private updated_at: Date
  private email_verify_token: string
  private forgot_password_token: string
  private verify: UserVerifyStatus

  constructor(user: UserType) {
    this._id = user._id
    this.name = user.name
    this.email = user.email
    this.password = user.password
    this.created_at = user.created_at
    this.updated_at = user.updated_at
    this.email_verify_token = user.email_verify_token
    this.forgot_password_token = user.forgot_password_token
    this.verify = user.verify
  }

  public getId(): ObjectId {
    return this._id
  }

  public getName(): string {
    return this.name
  }

  public getEmail(): string {
    return this.email
  }

  public getPassword(): string {
    return this.password
  }

  public getCreatedAt(): Date {
    return this.created_at
  }

  public getUpdatedAt(): Date {
    return this.updated_at
  }

  public getEmailVerifyToken(): string {
    return this.email_verify_token
  }

  public getForgotPasswordToken(): string {
    return this.forgot_password_token
  }

  public getVerifyStatus(): UserVerifyStatus {
    return this.verify
  }

  // Setter để cập nhật các thuộc tính
  public setName(name: string): void {
    this.name = name
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

  public getUser(): Omit<UserType, 'password'> {
    return {
      _id: this._id,
      name: this.name,
      email: this.email,
      created_at: this.created_at,
      updated_at: this.updated_at,
      email_verify_token: this.email_verify_token,
      forgot_password_token: this.forgot_password_token,
      verify: this.verify
    }
  }
}
