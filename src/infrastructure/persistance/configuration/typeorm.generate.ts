import * as fs from 'fs'

import '../../../../env/env.config'

import { TypeOrmConfig } from './typeorm.config'

const data = JSON.stringify(TypeOrmConfig, null, 2)
fs.writeFileSync('ormconfig.json', data)
