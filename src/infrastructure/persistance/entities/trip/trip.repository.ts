import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { TripEntity } from './Trip.entity'
import {
  Trip_REPOSITORY_INTERFACE,
  TripRepositoryException,
  TripRepositoryInterface,
} from '../../../../domain/trip/trip.repository'
import { Trip } from '../../../../domain/trip/trip.entity'
import { TripMapper } from './trip.mapper'

@Injectable()
export class TripRepository implements TripRepositoryInterface {
  constructor(
    @InjectRepository(TripEntity)
    private readonly tripRepository: Repository<TripEntity>,
  ) {}

  public async delete(trip: Trip): Promise<void> {
    try {
      const tripEntity: TripEntity | undefined = TripMapper.toInfra(trip)
      await this.tripRepository.softRemove(tripEntity)
    } catch (error) {
      console.error(error)
      throw TripRepositoryException.delete()
    }
  }

  public async save(trip: Trip): Promise<void> {
    try {
      const tripEntity: TripEntity | undefined = TripMapper.toInfra(trip)
      await this.tripRepository.save(tripEntity)
    } catch (error) {
      console.error(error)
      throw TripRepositoryException.save()
    }
  }

  public async findOneById(id: string): Promise<Trip | undefined> {
    try {
      const tripEntity: TripEntity | undefined = await this.tripRepository.findOne({
        where: { id },
      })
      if (tripEntity) {
        return TripMapper.toDomain(tripEntity)
      }
      return undefined
    } catch (error) {
      console.error(error)
      throw TripRepositoryException.findOne()
    }
  }

  public async findAllByUserId(userId: string): Promise<Trip[]> {
    try {
      const tripEntities: TripEntity[] = await this.tripRepository.find({
        where: {
          user_id: userId,
        },
      })
      return tripEntities.map((entity) => TripMapper.toDomain(entity))
    } catch (error) {
      console.error(error)
      throw TripRepositoryException.find()
    }
  }
}

export const TripRepositoryProvider = { provide: Trip_REPOSITORY_INTERFACE, useClass: TripRepository }
