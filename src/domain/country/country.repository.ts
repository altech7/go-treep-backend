import { Country } from './country.entity'

export class CountryRepositoryException extends Error {
  static findOne(): CountryRepositoryException {
    return new CountryRepositoryException(`Failed to find country.`)
  }
  static find(): CountryRepositoryException {
    return new CountryRepositoryException(`Failed to find countries.`)
  }
}

export interface CountryRepositoryInterface {
  findOneByAlpha3Code(alpha3Code: string): Promise<Country | undefined>
  findAll(): Promise<Country[]>
  findByName(name: string): Promise<Country[]>
}

export const COUNTRY_REPOSITORY_INTERFACE = 'COUNTRY_REPOSITORY_INTERFACE'
