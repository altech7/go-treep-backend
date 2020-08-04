import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'

import { FindUserQuery } from './find-user.query'

import { User, USER_REPOSITORY_INTERFACE, UserRepositoryInterface } from '../../../domain/user'

@QueryHandler(FindUserQuery)
export class FindUserHandler implements IQueryHandler<FindUserQuery> {
  constructor(@Inject(USER_REPOSITORY_INTERFACE) private readonly userRepository: UserRepositoryInterface) {}

  async execute(query: FindUserQuery): Promise<User | undefined> {
    const { id, email } = query
    if (id) {
      const user = await this.userRepository.findOneById(id)
      if (user) {
        return user
      }
    }
    if (email) {
      const user: User | undefined = await this.userRepository.findOneByEmail(email)
      if (user) {
        return user
      }
    }
    throw new Error('User not found')
  }
}
