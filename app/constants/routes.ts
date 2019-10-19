import { ModuleEnum } from '#/utils/module-enum'
import * as self from './routes'

export const LOG_IN = 'log-in'
           , CARDS = 'cards'

export type Routes = ModuleEnum<typeof self, string>
