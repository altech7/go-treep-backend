import { UserRepositoryInterface } from './user.repository'
import { User } from './user.entity'

export interface UserValidatorServiceInterface {
  isEmailUnique(user: User): Promise<boolean>
}

export class UserValidatorService implements UserValidatorServiceInterface {
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  public async isEmailUnique(user: User): Promise<boolean> {
    const userFound: User | undefined = await this.userRepository.findOneByEmail(user.email)
    return !userFound || user.id === userFound.id
  }
}
