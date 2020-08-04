import { User } from '../../../../domain/user'
import { UserEntity } from './user.entity'

export class UserMapper {
  public static toInfra(data: User): UserEntity {
    const user: UserEntity = new UserEntity()
    user.id = data.id
    user.first_name = data.firstName
    user.last_name = data.lastName
    user.email = data.email
    user.password = data.password
    return user
  }

  public static toDomain(data: UserEntity): User {
    return User.loadFromRepository({
      ...data,
      firstName: data.first_name,
      lastName: data.last_name,
    })
  }
}
