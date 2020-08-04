import { Module } from '@nestjs/common'

import { GraphModule } from './graphql/graphql.module'

@Module({
  imports: [GraphModule],
})
export class UIModule {}
