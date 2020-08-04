import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { CountryResolver } from './resolvers/country.resolver'

@Module({
  imports: [CqrsModule],
  providers: [CountryResolver],
  exports: [CountryResolver],
})
export class CountryGraphModule {}
