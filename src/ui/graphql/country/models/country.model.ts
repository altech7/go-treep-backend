import { Field, ObjectType, ID } from 'type-graphql'

@ObjectType()
export class Country {
  @Field(() => ID)
  alpha2Code: string

  @Field(() => ID)
  alpha3Code: string

  @Field()
  name: string
}
