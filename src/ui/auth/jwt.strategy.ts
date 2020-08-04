import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { QueryBus } from '@nestjs/cqrs'

import { User } from '../../domain/user'

import { Payload } from './auth.service'
import { UserPayload } from './user-payload.dto'
import { FindUserQuery } from '../../application/queries/FindUser/find-user.query'

const { JWT_IGNORE_EXPIRATION, JWT_SECRET } = process.env

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly queryBus: QueryBus) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: JWT_IGNORE_EXPIRATION === 'true',
      secretOrKey: JWT_SECRET,
    })
  }

  async validate(payload: Payload): Promise<UserPayload> {
    try {
      const query = new FindUserQuery({ id: payload.userId })
      const user = await this.queryBus.execute<FindUserQuery, User>(query)
      const userPayload = new UserPayload(user)
      return userPayload
    } catch (error) {
      console.error(error)
    }

    throw new UnauthorizedException()
  }
}
