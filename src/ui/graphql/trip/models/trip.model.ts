import { Field, ID, ObjectType } from 'type-graphql'
import { User } from '../../user/models/user.model'
import { Country } from '../../country/models/country.model'

@ObjectType()
export class Trip {
  @Field(() => ID)
  id: string

  @Field()
  pictureUrl: string

  @Field()
  countryAlpha3Code: string

  @Field()
  startAt: Date

  @Field()
  endAt: Date

  @Field(() => Country)
  country: Country

  @Field(() => User)
  user: User
}
