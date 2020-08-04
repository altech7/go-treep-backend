import { IsUUID, validateSync } from 'class-validator'

export interface EntityConstructorInterface {
  id: string
}

export abstract class Entity {
  @IsUUID('4')
  private readonly _id: string

  protected constructor(data: EntityConstructorInterface) {
    this._id = data.id
  }

  get id() {
    return this._id
  }

  protected validate() {
    const errors = validateSync(this)
    if (errors.length > 0) {
      console.error('Caught promise rejection (validation failed). Errors: ', errors)
      throw errors
    }
  }
}
