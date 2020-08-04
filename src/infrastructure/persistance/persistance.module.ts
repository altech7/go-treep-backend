import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TypeOrmConfig } from './configuration/typeorm.config'
import { UserInfraModule } from './entities/user/user.module'
import { TripInfraModule } from './entities/trip/trip.module'
import { CountryInfraModule } from './entities/country/country.module'

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), UserInfraModule, TripInfraModule, CountryInfraModule],
  exports: [UserInfraModule, TripInfraModule, CountryInfraModule],
})
export class PersistanceModule {}
