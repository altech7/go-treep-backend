import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { GraphQLModule } from '@nestjs/graphql'
import { AuthGraphModule } from './auth/auth.module'
import { UserGraphModule } from './user/user.module'

@Module({
  imports: [
    CqrsModule,
    GraphQLModule.forRoot({
      autoSchemaFile: './src/ui/graphql/schema.gql',
      context: ({ req }) => ({ req }),
    }),
    AuthGraphModule,
    UserGraphModule,
  ],
})
export class GraphModule {}
