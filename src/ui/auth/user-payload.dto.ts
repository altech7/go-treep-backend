import { User } from '../../domain/user'

export class UserPayload {
  id: string
  firstName: string
  lastName: string
  email: string
  companyId?: string

  constructor(user: User) {
    this.id = user.id
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.email = user.email
  }
}
