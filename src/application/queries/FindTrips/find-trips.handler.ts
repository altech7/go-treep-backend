import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'
import { Trip_REPOSITORY_INTERFACE, TripRepositoryInterface } from '../../../domain/trip/trip.repository'

import { FindTripsQuery } from './find-trips.query'

@QueryHandler(FindTripsQuery)
export class FindTripsHandler implements IQueryHandler<FindTripsQuery> {
  constructor(@Inject(Trip_REPOSITORY_INTERFACE) private readonly repository: TripRepositoryInterface) {}

  public execute(query: FindTripsQuery) {
    const { userId } = query
    return this.repository.findAllByUserId(userId)
  }
}
