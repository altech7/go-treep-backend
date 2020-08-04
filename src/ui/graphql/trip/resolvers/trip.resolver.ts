import { Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql'
import { Trip } from '../models/trip.model'
import { UseGuards } from '@nestjs/common'
import { CurrentUser, GqlAuthGuard } from '../../auth/gql-auth.guard'
import { UserPayload } from '../../../auth/user-payload.dto'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { FindTripsQuery } from '../../../../application/queries/FindTrips/find-trips.query'
import { Country } from '../../country/models/country.model'
import { FindCountryQuery } from 'src/application/queries/FindCountry/find-country.query'
import { FindUserQuery } from '../../../../application/queries/FindUser/find-user.query'
import { User } from '../../user/models/user.model'

@Resolver(() => Trip)
export class TripResolver {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Query(() => [Trip])
  @UseGuards(GqlAuthGuard)
  public trips(@CurrentUser() { id }: UserPayload): Promise<Trip[]> {
    return this.queryBus.execute<FindTripsQuery, Trip[]>(new FindTripsQuery(id))
  }

  @ResolveProperty()
  public country(@Parent() { countryAlpha3Code }: Trip): Promise<Country> {
    return this.queryBus.execute<FindCountryQuery, Country>(new FindCountryQuery(countryAlpha3Code))
  }

  @ResolveProperty()
  public user(@Parent() { user }: Trip): Promise<User> {
    return this.queryBus.execute<FindUserQuery, User>(new FindUserQuery({ id: user.id }))
  }
}
