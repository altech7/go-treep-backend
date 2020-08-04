import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { TraceableEntity } from '../traceable/traceable.entity'
import { UserEntity } from '../user/user.entity'

@Entity({ name: 't_e_trip' })
export class TripEntity extends TraceableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  country_alpha3Code: string

  @Column()
  picture_url: string

  @Column()
  start_at: Date

  @Column()
  end_at: Date

  @Column({ type: 'uuid' })
  user_id: string

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity
}
