import { Trip } from './Trip.entity'

export class TripRepositoryException extends Error {
  static delete(): TripRepositoryException {
    return new TripRepositoryException(`Failed to delete Trip.`)
  }
  static save(): TripRepositoryException {
    return new TripRepositoryException(`Failed to save Trip.`)
  }
  static findOne(): TripRepositoryException {
    return new TripRepositoryException(`Failed to find Trip.`)
  }
  static find(): TripRepositoryException {
    return new TripRepositoryException(`Failed to find Trips.`)
  }
}

export interface TripRepositoryInterface {
  delete(Trip: Trip): Promise<void>
  save(Trip: Trip): Promise<void>
  findOneById(id: string): Promise<Trip | undefined>
  findAllByUserId(userId: string): Promise<Trip[]>
}

export const Trip_REPOSITORY_INTERFACE = 'TRIP_REPOSITORY_INTERFACE'
