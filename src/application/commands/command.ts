import { validateSync } from 'class-validator'

export abstract class Command {
  protected validate() {
    const errors = validateSync(this)
    if (errors.length > 0) {
      console.error('Caught promise rejection (validation failed). Errors: ', errors)
      throw new Error(errors.toString())
    }
  }
}
