import { Field, InputType, ID } from 'type-graphql'

@InputType()
export class UserIdInput {
  @Field(() => ID)
  userId: string
}
