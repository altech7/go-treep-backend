import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'

import { CurrentUser, GqlAuthGuard } from '../../auth/gql-auth.guard'

import { UserCreateUserCommand } from '../../../../application/commands'
import { User } from '../models/user.model'
import { UserCreateInput } from '../inputs/user-create.input'
import { UserPayload } from '../../../auth/user-payload.dto'
import { FindUserQuery } from 'src/application/queries'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  me(@CurrentUser() user: UserPayload) {
    return user
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async createUser(@CurrentUser() user: UserPayload, @Args('input') input: UserCreateInput): Promise<User> {
    await this.commandBus.execute<UserCreateUserCommand>(new UserCreateUserCommand(user.id, input))
    return this.queryBus.execute<FindUserQuery, User>(new FindUserQuery({ email: input.email }))
  }
}
