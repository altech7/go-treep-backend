import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CommandBus, QueryBus } from '@nestjs/cqrs'

import { User, CreateUserInterface } from '../../domain/user'

import { RegisterUserCommand } from '../../application/commands'
import { FindUserQuery } from '../../application/queries'

import { UserPayload } from './user-payload.dto'

export interface Payload {
  userId: string
}

export interface AuthPayload {
  accessToken: string
  user: UserPayload
}

@Injectable()
export class AuthService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly jwtService: JwtService,
  ) {}

  public async signUp(userArg: CreateUserInterface): Promise<AuthPayload> {
    try {
      const command = new RegisterUserCommand(userArg)
      await this.commandBus.execute<RegisterUserCommand>(command)
      return this.signIn(userArg.email, userArg.password)
    } catch (error) {
      console.error(error)
    }

    throw new BadRequestException()
  }

  public async signIn(email: string, password: string): Promise<AuthPayload> {
    try {
      const query = new FindUserQuery({ email })
      const user = await this.queryBus.execute<FindUserQuery, User>(query)
      const isUserPassword = await user.isUserPassword(password)
      if (isUserPassword) {
        const payload: Payload = { userId: user.id }
        return {
          accessToken: this.jwtService.sign(payload),
          user: new UserPayload(user),
        }
      }
    } catch (error) {
      console.error(error)
    }

    throw new UnauthorizedException()
  }
}
