import { IsString, IsNotEmpty } from 'class-validator'

import { Query } from '../query'

export class FindCountryQuery extends Query {
  @IsString()
  @IsNotEmpty()
  public readonly alpha3Code: string

  constructor(alpha3Code: string) {
    super()
    this.alpha3Code = alpha3Code
    this.validate()
  }
}
