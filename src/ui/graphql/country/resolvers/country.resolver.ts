import { Args, Query, Resolver } from '@nestjs/graphql'
import { QueryBus } from '@nestjs/cqrs'

import { FindCountriesQuery } from '../../../../application/queries/FindCountries/find-countries.query'
import { CountryFindInput } from '../inputs/country-find.input'
import { Country } from '../models/country.model'

@Resolver(() => Country)
export class CountryResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => [Country])
  public countries(
    @Args({
      name: 'input',
      type: () => CountryFindInput,
      nullable: true,
    })
    input?: CountryFindInput,
  ): Promise<Country[]> {
    return this.queryBus.execute<FindCountriesQuery, Country[]>(new FindCountriesQuery(input?.query_string))
  }
}
