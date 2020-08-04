import { Module } from '@nestjs/common'

import { AuthModule } from '../../auth/auth.module'
import { AuthResolver } from './resolvers/auth.resolver'

@Module({
  imports: [AuthModule],
  providers: [AuthResolver],
  exports: [AuthResolver],
})
export class AuthGraphModule {}
