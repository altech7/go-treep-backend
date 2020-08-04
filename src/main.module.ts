import 'reflect-metadata'

import '../env/env.config'

import { InfrastructureModule } from './infrastructure/infrastructure.module'
import { ApplicationModule } from './application/application.module'
import { UIModule } from './ui/ui.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [InfrastructureModule, ApplicationModule, UIModule],
})
export class MainModule {}
