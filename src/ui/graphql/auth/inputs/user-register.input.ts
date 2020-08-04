import { Field, InputType } from 'type-graphql'

@InputType()
export class UserRegisterInput {
  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  email: string

  @Field()
  password: string
}
