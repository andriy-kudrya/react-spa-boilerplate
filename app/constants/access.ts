import { ModuleEnum } from '#/utils/module-enum'
import * as self from './access'

export const LOG_IN = 'logIn'
           , CARDS = 'viewCards'

export type Access = ModuleEnum<typeof self, string>
