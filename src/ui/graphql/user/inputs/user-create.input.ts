import { Field, InputType } from 'type-graphql'

@InputType()
export class UserCreateInput {
  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  email: string
}
