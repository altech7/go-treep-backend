import { Field, InputType } from 'type-graphql'

@InputType()
export class CountryFindInput {
  @Field({ nullable: true })
  query_string?: string
}
