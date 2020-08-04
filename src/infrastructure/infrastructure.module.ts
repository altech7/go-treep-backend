import { Global, Module } from '@nestjs/common'

import { PersistanceModule } from './persistance/persistance.module'

@Global()
@Module({
  imports: [PersistanceModule],
  exports: [PersistanceModule],
})
export class InfrastructureModule {}
