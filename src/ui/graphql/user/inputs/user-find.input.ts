import { Field, InputType } from 'type-graphql'

@InputType()
export class UserFindInput {
  @Field({ nullable: true })
  query_string?: string
}
