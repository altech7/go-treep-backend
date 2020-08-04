import { TripEntity } from './Trip.entity'
import { Trip } from '../../../../domain/trip/trip.entity'

export class TripMapper {
  public static toInfra(data: Trip): TripEntity {
    const trip: TripEntity = new TripEntity()
    trip.id = data.id
    trip.country_alpha3Code = data.countryAlpha3Code
    trip.picture_url = data.pictureUrl
    trip.start_at = data.startAt
    trip.end_at = data.endAt
    trip.user_id = data.userId
    return trip
  }

  public static toDomain(data: TripEntity): Trip {
    return Trip.loadFromRepository({
      ...data,
      countryAlpha3Code: data.country_alpha3Code,
      pictureUrl: data.picture_url,
      startAt: data.start_at,
      endAt: data.end_at,
      userId: data.user_id,
    })
  }
}
