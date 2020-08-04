import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'

import { User, USER_REPOSITORY_INTERFACE, UserRepositoryInterface, UserValidatorService } from '../../../domain/user'
import { UserCreateUserCommand } from './user-create-user.command'

@CommandHandler(UserCreateUserCommand)
export class UserCreateUserHandler implements ICommandHandler<UserCreateUserCommand> {
  constructor(@Inject(USER_REPOSITORY_INTERFACE) private readonly repository: UserRepositoryInterface) {}

  public async execute(command: UserCreateUserCommand) {
    const userInDemand: User | undefined = await this.repository.findOneById(command.userId)
    if (!userInDemand) {
      throw new Error('Requesting user not found')
    }
    // Set default password to create user. need to send email with password
    const password = 'password'
    const validator: UserValidatorService = new UserValidatorService(this.repository)
    const userToCreate: User = await User.create(
      {
        ...command.userToCreate,
        password,
      },
      validator,
    )
    await this.repository.save(userToCreate)
  }
}
