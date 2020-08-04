import { Module, HttpModule } from '@nestjs/common'

import { CountryRepositoryProvider } from './country.repository'

@Module({
  imports: [HttpModule],
  providers: [CountryRepositoryProvider],
  exports: [CountryRepositoryProvider],
})
export class CountryInfraModule {}
