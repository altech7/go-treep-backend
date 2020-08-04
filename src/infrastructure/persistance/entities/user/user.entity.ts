import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { TraceableEntity } from '../traceable/traceable.entity'

@Entity({ name: 't_e_user' })
export class UserEntity extends TraceableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  first_name: string

  @Column()
  last_name: string

  @Column({ unique: true })
  email: string

  @Column({ nullable: false })
  password: string
}
