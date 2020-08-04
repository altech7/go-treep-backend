import { IsUUID } from 'class-validator'

import { Command } from '../command'

interface UserInterface {
  firstName: string
  lastName: string
  email: string
}

export class UserCreateUserCommand extends Command {
  @IsUUID('4')
  public readonly userId: string

  public readonly userToCreate: UserInterface

  constructor(userId: string, userToCreate: UserInterface) {
    super()
    this.userId = userId
    this.userToCreate = userToCreate
    this.validate()
  }
}
