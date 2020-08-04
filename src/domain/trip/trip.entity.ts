import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator'
import { v4 } from 'uuid'

import { Entity, EntityConstructorInterface } from '../core/entities/entity'
import { User } from '../user'
import { Country } from '../country/country.entity'

export interface TripInterface extends EntityConstructorInterface {
  countryAlpha3Code: string
  pictureUrl: string
  startAt: Date
  endAt: Date
  userId: string
}

export interface CreateTripInterface {
  id?: string
  pictureUrl: string
  startAt: Date
  endAt: Date
  user: User
  country: Country
}

export class Trip extends Entity {
  @IsString()
  @IsNotEmpty()
  private _countryAlpha3Code: string

  @IsString()
  @IsNotEmpty()
  private _pictureUrl: string

  @IsDate()
  @IsNotEmpty()
  private _startAt: Date

  @IsDate()
  @IsNotEmpty()
  private _endAt: Date

  @IsUUID('4')
  private _userId: string

  private constructor(data: TripInterface) {
    super(data)
    this._countryAlpha3Code = data.countryAlpha3Code
    this._pictureUrl = data.pictureUrl
    this._startAt = data.startAt
    this._endAt = data.endAt
    this._userId = data.userId
    this.validate()
  }

  public static create(data: CreateTripInterface): Trip {
    const trip: Trip = new Trip({
      id: data.id || v4(),
      userId: data.user.id,
      countryAlpha3Code: data.country.alpha3Code,
      ...data,
    })
    return trip
  }

  public static loadFromRepository(data: TripInterface) {
    return new Trip(data)
  }

  get countryAlpha3Code(): string {
    return this._countryAlpha3Code
  }

  get pictureUrl(): string {
    return this._pictureUrl
  }

  get startAt(): Date {
    return this._startAt
  }

  get endAt(): Date {
    return this._endAt
  }

  get userId(): string {
    return this._userId
  }

  set userId(value: string) {
    this._userId = value
    this.validate()
  }
}
