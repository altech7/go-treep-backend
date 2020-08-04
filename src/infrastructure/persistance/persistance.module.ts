import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TypeOrmConfig } from './configuration/typeorm.config'
import { UserInfraModule } from './entities/user/user.module'

@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig), UserInfraModule],
  exports: [UserInfraModule],
})
export class PersistanceModule {}
