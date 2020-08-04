import { Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { CurrentUser, GqlAuthGuard } from '../../auth/gql-auth.guard'
import { User } from '../models/user.model'
import { UserPayload } from '../../../auth/user-payload.dto'

@Resolver(() => User)
export class UserResolver {
  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  me(@CurrentUser() user: UserPayload): UserPayload {
    return user
  }
}
