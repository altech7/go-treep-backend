import { IsString, IsOptional, IsNotEmpty } from 'class-validator'

import { Query } from '../query'

export class FindCountriesQuery extends Query {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public readonly name?: string

  constructor(name?: string) {
    super()
    this.name = name
    this.validate()
  }
}
