import { IsNotEmpty, IsString, validateSync } from 'class-validator'

export interface CountryInterface {
  alpha2Code: string
  alpha3Code: string
  name: string
}

export class Country {
  @IsString()
  @IsNotEmpty()
  private _alpha2Code: string

  @IsString()
  @IsNotEmpty()
  private _alpha3Code: string

  @IsString()
  @IsNotEmpty()
  private _name: string

  private constructor(data: CountryInterface) {
    this._alpha2Code = data.alpha2Code
    this._alpha3Code = data.alpha3Code
    this._name = data.name

    this.validate()
  }

  public static loadFromRepository(data: CountryInterface): Country {
    const country = new Country(data)
    return country
  }

  protected validate() {
    const errors = validateSync(this)
    if (errors.length > 0) {
      console.error('Caught promise rejection (validation failed). Errors: ', errors)
      throw errors
    }
  }

  get alpha2Code() {
    return this._alpha2Code
  }

  get alpha3Code() {
    return this._alpha3Code
  }

  get name() {
    return this._name
  }
}
