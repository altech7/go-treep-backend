import { BaseEntity, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm'

export abstract class TraceableEntity extends BaseEntity {
  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'created_at',
  })
  created_date: Date

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: true,
    onUpdate: 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updated_date: Date

  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
    name: 'deleted_at',
  })
  deleted_date: Date
}
