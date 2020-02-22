import type { ModuleEnum } from '#/utils/module-enum'
import type * as self from './routes'

export const LOG_IN = 'log-in'
           , CARDS = 'cards'
           , DEMO = 'demo'

export type Routes = ModuleEnum<typeof self, string>
