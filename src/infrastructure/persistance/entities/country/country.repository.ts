import { Injectable, HttpService } from '@nestjs/common'

import {
  COUNTRY_REPOSITORY_INTERFACE,
  CountryRepositoryInterface,
  CountryRepositoryException,
} from '../../../../domain/country/country.repository'
import { Country } from '../../../../domain/country/country.entity'

@Injectable()
export class CountryRepository implements CountryRepositoryInterface {
  private cachedCountries: Country[] = []

  constructor(private http: HttpService) {
    this.findCountries()
  }

  private async findCountries() {
    try {
      const { data } = await this.http.get('https://restcountries.eu/rest/v2/all').toPromise()
      const countries = await Promise.all(
        (data as any[]).map((country) => {
          return Country.loadFromRepository({
            alpha2Code: country.alpha2Code,
            alpha3Code: country.alpha3Code,
            name: country.name,
          })
        }),
      )
      this.cachedCountries = countries
    } catch (error) {
      console.error(error)
    }
  }

  public async findOneByAlpha3Code(alpha3Code: string): Promise<Country | undefined> {
    try {
      const country = this.cachedCountries.find((country) => country.alpha3Code === alpha3Code)
      return country
    } catch (error) {
      console.error('findByAlpha3Code. Errors: ', error)
    }

    throw CountryRepositoryException.findOne()
  }

  public async findAll(): Promise<Country[]> {
    return this.cachedCountries
  }

  public async findByName(name: string): Promise<Country[]> {
    try {
      const regex = new RegExp(name, 'i')
      return this.cachedCountries.filter((country) => country.name.search(regex) !== -1)
    } catch (error) {
      console.error('findByName. Errors: ', error)
    }
    throw CountryRepositoryException.find()
  }
}

export const CountryRepositoryProvider = { provide: COUNTRY_REPOSITORY_INTERFACE, useClass: CountryRepository }
