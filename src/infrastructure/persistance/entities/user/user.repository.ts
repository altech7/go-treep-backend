import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import {
  User,
  USER_REPOSITORY_INTERFACE,
  UserRepositoryException,
  UserRepositoryInterface,
} from '../../../../domain/user'
import { UserEntity } from './user.entity'
import { UserMapper } from './user.mapper'

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async save(user: User): Promise<void> {
    try {
      const userEntity: UserEntity | undefined = UserMapper.toInfra(user)
      await this.userRepository.save(userEntity)
    } catch (error) {
      console.error(error)
      throw UserRepositoryException.save()
    }
  }

  public async findOneById(id: string): Promise<User | undefined> {
    try {
      const userEntity: UserEntity | undefined = await this.userRepository.findOne({
        where: { id },
      })
      if (userEntity) {
        return UserMapper.toDomain(userEntity)
      }
      return undefined
    } catch (error) {
      console.error(error)
      throw UserRepositoryException.findOne()
    }
  }

  public async findOneByEmail(email: string): Promise<User | undefined> {
    try {
      const userEntity: UserEntity | undefined = await this.userRepository.findOne({
        where: { email },
      })
      if (userEntity) {
        return UserMapper.toDomain(userEntity)
      }
      return undefined
    } catch (error) {
      console.error(error)
      throw UserRepositoryException.findOne()
    }
  }
}

export const UserRepositoryProvider = { provide: USER_REPOSITORY_INTERFACE, useClass: UserRepository }
