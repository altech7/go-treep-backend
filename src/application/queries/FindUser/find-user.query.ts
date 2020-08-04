import { IsOptional, IsUUID, IsEmail } from 'class-validator'

import { Query } from '../query'

interface FiltersInterface {
  id?: string
  email?: string
}

export class FindUserQuery extends Query {
  @IsOptional()
  @IsUUID('4')
  public readonly id?: string

  @IsOptional()
  @IsEmail()
  public readonly email?: string

  constructor(filters: FiltersInterface) {
    super()
    this.id = filters.id
    this.email = filters.email
    this.validate()
  }

  validate() {
    super.validate()
    if (!this.id && !this.email) {
      throw new Error('At least one filter parameter required')
    }
  }
}
