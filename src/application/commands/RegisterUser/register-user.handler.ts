import { ICommandHandler, CommandHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'

import { User } from '../../../domain/user'
import { USER_REPOSITORY_INTERFACE, UserRepositoryInterface } from '../../../domain/user'
import { UserValidatorService } from '../../../domain/user'

import { RegisterUserCommand } from './register-user.command'

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
  constructor(@Inject(USER_REPOSITORY_INTERFACE) private readonly repository: UserRepositoryInterface) {}

  public async execute(command: RegisterUserCommand) {
    const validator: UserValidatorService = new UserValidatorService(this.repository)
    const user: User = await User.create(command.user, validator)
    await this.repository.save(user)
  }
}
