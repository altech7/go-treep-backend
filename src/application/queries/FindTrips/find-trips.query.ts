import { Query } from '../query'
import { IsUUID } from 'class-validator'

export class FindTripsQuery extends Query {
  @IsUUID('4')
  public readonly userId: string

  constructor(userId: string) {
    super()
    this.userId = userId
    this.validate()
  }
}
