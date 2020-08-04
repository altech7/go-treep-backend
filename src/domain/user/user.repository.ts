import { User } from './user.entity'

export class UserRepositoryException extends Error {
  static save(): UserRepositoryException {
    return new UserRepositoryException(`Failed to save user.`)
  }
  static findOne(): UserRepositoryException {
    return new UserRepositoryException(`Failed to find user.`)
  }
  static find(): UserRepositoryException {
    return new UserRepositoryException(`Failed to find users.`)
  }
}

export interface UserRepositoryInterface {
  save(user: User): Promise<void>
  findOneById(id: string): Promise<User | undefined>
  findOneByEmail(email: string): Promise<User | undefined>
}

export const USER_REPOSITORY_INTERFACE = 'USER_REPOSITORY_INTERFACE'
