import { Mutation, Resolver, Args } from '@nestjs/graphql'

import { AuthService } from '../../../auth/auth.service'
import { AuthPayload } from '../models/auth-payload.model'
import { UserRegisterInput } from '../inputs/user-register.input'
import { UserCredentialsInput } from '../inputs/user-credentials.input'

@Resolver(() => AuthPayload)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload)
  public signIn(@Args('input') input: UserCredentialsInput): Promise<AuthPayload> {
    const { email, password } = input
    return this.authService.signIn(email, password)
  }

  @Mutation(() => AuthPayload)
  public signUp(@Args('input') input: UserRegisterInput): Promise<AuthPayload> {
    return this.authService.signUp(input)
  }
}
