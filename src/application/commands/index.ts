import { RegisterUserHandler } from './RegisterUser/register-user.handler'

import { UserCreateUserHandler } from './UserCreateUser/user-create-user.handler'

// User
export * from './RegisterUser/register-user.command'
export * from './UserCreateUser/user-create-user.command'

export const CommandHandlers = [RegisterUserHandler, UserCreateUserHandler]
