import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { AuthModule } from '../../auth/auth.module'
import { UserResolver } from './resolvers/user.resolver'

@Module({
  imports: [AuthModule, CqrsModule],
  providers: [UserResolver],
  exports: [UserResolver],
})
export class UserGraphModule {}
