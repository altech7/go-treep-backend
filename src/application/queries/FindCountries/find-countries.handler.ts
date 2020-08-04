import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { COUNTRY_REPOSITORY_INTERFACE, CountryRepositoryInterface } from '../../../domain/country/country.repository'

import { FindCountriesQuery } from './find-countries.query'
import { Country } from '../../../domain/country/country.entity'

@QueryHandler(FindCountriesQuery)
export class FindCountriesHandler implements IQueryHandler<FindCountriesQuery> {
  constructor(@Inject(COUNTRY_REPOSITORY_INTERFACE) private readonly repository: CountryRepositoryInterface) {}

  public async execute(query: FindCountriesQuery): Promise<Country[]> {
    const { name } = query
    return name && name !== '' ? this.repository.findByName(name) : this.repository.findAll()
  }
}
