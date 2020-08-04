import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { DomainModule } from '../domain/domain.module'

import { CommandHandlers } from './commands'
import { QueryHandlers } from './queries'

@Module({
  imports: [CqrsModule, DomainModule],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class ApplicationModule {}
