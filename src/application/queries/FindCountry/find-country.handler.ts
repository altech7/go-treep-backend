import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { COUNTRY_REPOSITORY_INTERFACE, CountryRepositoryInterface } from '../../../domain/country/country.repository'

import { FindCountryQuery } from './find-country.query'
import { Country } from '../../../domain/country/country.entity'

@QueryHandler(FindCountryQuery)
export class FindCountryHandler implements IQueryHandler<FindCountryQuery> {
  constructor(@Inject(COUNTRY_REPOSITORY_INTERFACE) private readonly repository: CountryRepositoryInterface) {}

  public execute(query: FindCountryQuery): Promise<Country | undefined> {
    const { alpha3Code } = query
    return this.repository.findOneByAlpha3Code(alpha3Code)
  }
}
