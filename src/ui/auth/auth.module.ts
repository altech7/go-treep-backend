import { Module, HttpModule } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { CqrsModule } from '@nestjs/cqrs'
import { JwtModule } from '@nestjs/jwt'

import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env

@Module({
  imports: [
    HttpModule,
    CqrsModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRES_IN },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
