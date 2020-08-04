import { Field, InputType, ID } from 'type-graphql'

@InputType()
export class UserUpdateInput {
  @Field(() => ID)
  id: string

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  email: string
}
