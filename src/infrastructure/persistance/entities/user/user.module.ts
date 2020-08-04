import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserEntity } from './user.entity'
import { UserRepositoryProvider } from './user.repository'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserRepositoryProvider],
  exports: [UserRepositoryProvider],
})
export class UserInfraModule {}
