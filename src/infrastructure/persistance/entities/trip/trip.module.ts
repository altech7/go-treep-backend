import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TripEntity } from './trip.entity'
import { TripRepositoryProvider } from './trip.repository'

@Module({
  imports: [TypeOrmModule.forFeature([TripEntity])],
  providers: [TripRepositoryProvider],
  exports: [TripRepositoryProvider],
})
export class TripInfraModule {}
