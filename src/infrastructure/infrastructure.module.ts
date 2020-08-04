import { Module, Global, HttpModule } from '@nestjs/common'

import { PersistanceModule } from './persistance/persistance.module'

@Global()
@Module({
  imports: [HttpModule, PersistanceModule],
  exports: [PersistanceModule],
})
export class InfrastructureModule {}
