import { BaseEntity, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm'

export abstract class TraceableEntity extends BaseEntity {
  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    select: true,
    name: 'created_at',
  })
  created_date: Date

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP',
    select: false,
  })
  updated_date: Date

  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
    select: false,
  })
  deleted_date: Date
}
