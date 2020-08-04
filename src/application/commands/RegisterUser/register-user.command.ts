import { Command } from '../command'

interface UserInterface {
  firstName: string
  lastName: string
  email: string
  password: string
}

export class RegisterUserCommand extends Command {
  public readonly user: UserInterface

  constructor(user: UserInterface) {
    super()
    this.user = user
    this.validate()
  }
}
