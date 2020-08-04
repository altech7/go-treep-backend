import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { compare, hash } from 'bcrypt'
import { v4 } from 'uuid'

import { UserValidatorServiceInterface } from './user-validator.service'
import { Entity, EntityConstructorInterface } from '../core/entities/entity'

export interface UserInterface extends EntityConstructorInterface {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface CreateUserInterface {
  id?: string
  firstName: string
  lastName: string
  email: string
  password: string
}

export class User extends Entity {
  @IsString()
  @IsNotEmpty()
  private _firstName: string

  @IsString()
  @IsNotEmpty()
  private _lastName: string

  @IsEmail()
  private _email: string

  private _password: string

  private constructor(data: UserInterface) {
    super(data)

    this._firstName = data.firstName
    this._lastName = data.lastName
    this._email = data.email
    this._password = data.password

    this.validate()
  }

  public static async create(data: CreateUserInterface, validator: UserValidatorServiceInterface): Promise<User> {
    const user = new User({
      id: data.id || v4(),
      ...data,
    })
    const isEmailUnique = await validator.isEmailUnique(user)
    if (!isEmailUnique) {
      throw new Error('Email already taken')
    }
    await user.encryptPassword()
    return user
  }

  public static loadFromRepository(data: UserInterface) {
    return new User(data)
  }

  get firstName() {
    return this._firstName
  }

  setFirstName(firstName: string) {
    this._firstName = firstName
    this.validate()
  }

  get lastName() {
    return this._lastName
  }

  setLastName(lastName: string) {
    this._lastName = lastName
    this.validate()
  }

  get email() {
    return this._email
  }

  async setEmail(email: string, validator: UserValidatorServiceInterface) {
    if (this.email !== email) {
      this._email = email
      this.validate()

      const isEmailUnique = await validator.isEmailUnique(this)
      if (!isEmailUnique) {
        throw new Error('Email already taken')
      }
    }
  }

  get password() {
    return this._password
  }

  private async encryptPassword(): Promise<void> {
    const hashPassword: string = await hash(this.password, 10)
    this._password = hashPassword
  }

  isUserPassword(password: string): Promise<boolean> {
    return compare(password, this.password)
  }
}
