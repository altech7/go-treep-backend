import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { UserEntity } from '../entities/user/user.entity'

const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT || '5432', 10),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: [UserEntity],
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  cli: {
    migrationsDir: 'src/infrastructure/persistence/migrations',
  },
  synchronize: true,
}
