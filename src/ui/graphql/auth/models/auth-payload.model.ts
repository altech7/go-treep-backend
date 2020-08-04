import { Field, ObjectType } from 'type-graphql'
import { User } from '../../user/models/user.model'

@ObjectType()
export class AuthPayload {
  @Field()
  accessToken: string

  @Field()
  user: User
}
