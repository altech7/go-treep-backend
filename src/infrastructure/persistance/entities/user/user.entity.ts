import { Column, Entity, PrimaryColumn } from 'typeorm'
import { TraceableEntity } from '../traceable/traceable.entity'

@Entity()
export class UserEntity extends TraceableEntity {
  @PrimaryColumn({ type: 'uuid', unique: true })
  id: string

  @Column()
  first_name: string

  @Column()
  last_name: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string
}
