import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { AuthModule } from '../../auth/auth.module'
import { TripResolver } from './resolvers/trip.resolver'

@Module({
  imports: [AuthModule, CqrsModule],
  providers: [TripResolver],
  exports: [TripResolver],
})
export class TripGraphModule {}
